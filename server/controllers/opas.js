const Opas = require('../models/opas');
const slugify = require('slugify');
const request = require('request');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

function parseFilters(queries) {
  const parsedQueries = {};
  if (queries.filter) {
    Object.keys(queries).forEach((qKey) => {
      if (qKey.includes('filter')) {
        const pKey = qKey.match(/\[([^)]+)\]/)[1]
        parsedQueries[pKey] = queries[qKey]
      }
    })
  }

  return parsedQueries
}

exports.getOppaat = (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 0;
  const pageNum = parseInt(req.query.pageNum) || 1;
  const skips = pageSize * (pageNum - 1);
  const filters = req.query.filter || {}

  Opas.find({status: 'published', ...filters})
      .sort({'createdAt': -1})
      .populate('author -_id -password -products -email -role')
      .skip(skips)
      .limit(pageSize)
      .exec(function(errors, publishedOppaat) {
    if (errors) {
      return res.status(422).send(errors);
    }

    Opas.countDocuments({status: 'published'})
      .then(count => {
        return res.json({oppaat: publishedOppaat, count, pageCount: Math.ceil(count / pageSize)});
      });
  });
}

exports.getMediumOppaat = (req, res) => {
  request.get(MEDIUM_URL, (err, apiRes, body) => {
    if (!err && apiRes.statusCode === 200) {
      let i = body.indexOf("{");
      const data = body.substr(i);
      res.send(data)
    } else {
      res.sendStatus(500).json(err);
    }
  });
}


exports.getOpasBySlug = (req, res) => {
  const slug = req.params.slug;

  Opas.findOne({slug})
      .populate('author -_id -password -products -email -role')
      .exec(function(errors, foundOpas) {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(foundOpas);
  });
}

exports.getOpasById = (req, res) => {
  const opasId = req.params.id;

  Opas.findById(opasId, (errors, foundOpas) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(foundOpas);
  });
}

exports.getUserOppaat = (req, res) => {
  const user = req.user;

  Opas.find({author: user.id}, function(errors, userOppaat) {
    if (errors) {
     return res.status(422).send(errors);
    }

    return res.json(userOppaat);
  });
}

exports.updateOpas = (req, res) => {
  const opasId = req.params.id;
  const opasData = req.body;

  Opas.findById(opasId, function(errors, foundOpas) {
    if (errors) {
      return res.status(422).send(errors);
    }

    if (opasData.status && opasData.status === 'published' && !foundOpas.slug) {

      foundOpas.slug = slugify(foundOpas.title, {
                                  replacement: '-',    // replace spaces with replacement
                                  remove: null,        // regex to remove characters
                                  lower: true          // result in lower case
                                });

      }

      foundOpas.set(opasData);
      foundOpas.updatedAt = new Date();
      foundOpas.save(function(errors, foundOpas) {
      if (errors) {
        return res.status(422).send(errors);
      }

      return res.json(foundOpas);
    });
  });
}


exports.createOpas = (req, res) => {
  const lockId = req.query.lockId;

  if (!lock.isBusy(lockId)) {
    lock.acquire(lockId, function(done) {
    const opasData = req.body;
    const opas = new Opas(opasData);
    opas.author = req.user;

    opas.save((errors, createdOpas) => {
      setTimeout(() => done(), 5000);

      if (errors) {
        return res.status(422).send(errors);
      }

      return res.json(createdOpas);
    });
    }, function(errors, ret) {
        errors && console.error(errors)
    });
  } else {
    return res.status(422).send({message: 'Opas is getting saved!'});
  }
}


exports.deleteOpas = (req, res) => {
  const opasId = req.params.id;

  Opas.deleteOne({_id: opasId}, function(errors) {
    if (errors) {
      return res.status(422).send(errors);
    }

    res.json({status: 'deleted'});
  });
}







