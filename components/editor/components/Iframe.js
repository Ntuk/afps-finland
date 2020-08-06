import { Node } from 'tiptap'

export default class Iframe extends Node {
  get name() {
    return 'iframe'
  }

  get schema() {
    return {
      attrs: {
        frameborder: {
          default: 0
        },
        allowfullscreen: {
          default: 'true'
        },
        allow: {
          default: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        },
        width: {
          default: '560'
        },
        // height: {
        //   default: '315'
        // },
        src: {
          default: 'https://youtube.com/embed/IHv0nVxnycw'
        }
      },
      group: 'block',
      selectable: false,
      parseDOM: [
        {
          tag: 'iframe[src]',
          getAttrs: dom => ({
            src: dom.getAttribute('src')
          })
        }
      ],
      toDOM: node => ['iframe', node.attrs],
    }
  }

  get view() {
    return {
      name: 'YoutubeEmbed',
      props: ['node', 'updateAttrs', 'view'],
      computed: {
        src: {
          get() {
            return this.node.attrs.src
          },
          set(src) {
            this.updateAttrs({
              src,
            })
          },
        },
      },
      render: function(createElement) {
        return createElement('div', {
          class: 'video-container',
          style: `overflow:hidden;padding-bottom:56.25%;position:relative;height:0;border:1px solid black;border-radius:3px;`
        },
        [
          createElement('iframe', {
            style: ` left:0;top:0;height:100%;width:100%;position:absolute;`,
            attrs: {
              ...this.node.attrs
            }
          }),
        ])
      }
    }
  }

  commands({ type }) {
    return (attrs) => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }
}