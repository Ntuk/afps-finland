const Uutinen = require('../models/uutinen');
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

exports.getUutiset = (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 0;
  const pageNum = parseInt(req.query.pageNum) || 1;
  const skips = pageSize * (pageNum - 1);
  const filters = req.query.filter || {}

  Uutinen.find({status: 'published', ...filters})
      .sort({'createdAt': -1})
      .populate('author -_id -password -products -email -role')
      .skip(skips)
      .limit(pageSize)
      .exec(function(errors, publishedUutiset) {
    if (errors) {
      return res.status(422).send(errors);
    }

    Uutinen.countDocuments({status: 'published'})
      .then(count => {
        return res.json({uutiset: publishedUutiset, count, pageCount: Math.ceil(count / pageSize)});
      });
  });
}

exports.getMediumUutiset = (req, res) => {
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


exports.getUutinenBySlug = (req, res) => {
  const slug = req.params.slug;

  Uutinen.findOne({slug})
      .populate('author -_id -password -products -email -role')
      .exec(function(errors, foundUutinen) {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(foundUutinen);
  });
}

exports.getUutinenById = (req, res) => {
  const uutinenId = req.params.id;

  Uutinen.findById(uutinenId, (errors, foundUutinen) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(foundUutinen);
  });
}

exports.getUserUutiset = (req, res) => {
  const user = req.user;

  Uutinen.find({author: user.id}, function(errors, userUutiset) {
    if (errors) {
     return res.status(422).send(errors);
    }

    return res.json(userUutiset);
  });
}

exports.updateUutinen = (req, res) => {
  const uutinenId = req.params.id;
  const uutinenData = req.body;

  Uutinen.findById(uutinenId, function(errors, foundUutinen) {
    if (errors) {
      return res.status(422).send(errors);
    }

    if (uutinenData.status && uutinenData.status === 'published' && !foundUutinen.slug) {

      foundUutinen.slug = slugify(foundUutinen.title, {
                                  replacement: '-',    // replace spaces with replacement
                                  remove: null,        // regex to remove characters
                                  lower: true          // result in lower case
                                });

      }

      foundUutinen.set(uutinenData);
      foundUutinen.updatedAt = new Date();
      foundUutinen.save(function(errors, foundUutinen) {
      if (errors) {
        return res.status(422).send(errors);
      }

      return res.json(foundUutinen);
    });
  });
}


exports.createUutinen = (req, res) => {
  const lockId = req.query.lockId;

  if (!lock.isBusy(lockId)) {
    lock.acquire(lockId, function(done) {
    const uutinenData = req.body;
    const uutinen = new Uutinen(uutinenData);
    uutinen.author = req.user;

    uutinen.save((errors, createdUutinen) => {
      setTimeout(() => done(), 5000);

      if (errors) {
        return res.status(422).send(errors);
      }

      return res.json(createdUutinen);
    });
    }, function(errors, ret) {
        errors && console.error(errors)
    });
  } else {
    return res.status(422).send({message: 'Uutinen is getting saved!'});
  }
}


exports.deleteUutinen = (req, res) => {
  const uutinenId = req.params.id;

  Uutinen.deleteOne({_id: uutinenId}, function(errors) {
    if (errors) {
      return res.status(422).send(errors);
    }

    res.json({status: 'deleted'});
  });
}







