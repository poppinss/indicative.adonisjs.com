module.exports = function (hooks) {
  hooks.before('compile', function ({ Markdown }) {
    Markdown.addMacro('casts', function (content, props, { transformer, eat }) {
      return {
        type: 'TableNode',
        data: {
          hName: 'table',
        },
        children: [
          {
            type: 'TableHead',
            data: {
              hName: 'thead'
            },
            children: [{
              type: 'TableRow',
              data: {
                hName: 'tr'
              },
              children: [
                {
                  type: 'TableHeadColumn',
                  data: {
                    hName: 'th',
                  },
                  children: [{ value: 'Casts from', type: 'text' }]
                },
                {
                  type: 'TableHeadColumn',
                  data: {
                    hName: 'th',
                  },
                  children: [{ value: 'Casts to', type: 'text' }]
                }
              ]
            }]
          },
          {
            type: 'TableBody',
            data: {
              hName: 'tbody'
            },
            children: transformer.tokenizeBlock(content, eat.now())
          }
        ]
      }
    }, false)

    Markdown.addMacro('label', function (props) {
      return {
        type: 'LabelRow',
        data: {
          hName: 'tr',
        },
        children: [
          {
            type: 'LabelColumn',
            data: {
              hName: 'td',
            },
            children: [{
              type: 'LabelNode',
              data: {
                hName: 'span',
                hProperties: {
                  className: ['fancy-label', props.from]
                }
              },
              children: [{ type: 'text', value: props.fromText || props.from }]
            }]
          },
          {
            type: 'LabelColumn',
            data: {
              hName: 'td',
            },
            children: [{
              type: 'LabelNode',
              data: {
                hName: 'span',
                hProperties: {
                  className: ['fancy-label', props.to]
                }
              },
              children: [{ type: 'text', value: props.toText || props.to }]
            }]
          },
        ]
      }
    }, true)
  })
}
