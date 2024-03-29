export default {
  array: true,
  arrayComponent: 'block',
  fields: {
    basic: {
      type: 'object',
      layoutType: 'card',
      layoutProps: {
        title: '基本信息'
      },
      props: {
        inline: true
      },
      fields: {
        bb: {
          type: 'select',
          props: {
            style: {
              maxWidth: 300
            }
          },
          enum: [
            'a',
            'b',
            'c',
            'd',
            'e'
          ],
          title: 'BB'
        },
        cc: {
          type: 'select',
          props: {
            style: {
              maxWidth: 300
            }
          },
          required: true,
          enum: [],
          title: 'CC'
        },
        gg: {
          type: 'string',
          props: {
            style: {
              width: 200
            }
          },
          title: 'GG'
        }
      }
    },
    dd: {
      type: 'object',
      array: true,
      arrayComponent: 'block',
      arrayProps: {
        addText: '添加一项',
        removeText: '删除'
      },
      layoutType: 'card',
      layoutProps: {
        title: '嵌套Array'
      },
      props: {
        inline: true
      },
      fields: {
        ee: {
          type: 'select',
          props: {
            style: {
              maxWidth: 300
            }
          },
          wrapperProps: {
            extra: '是否隐藏GG'
          },
          enum: [
            '是',
            '否'
          ],
          title: 'EE'
        },
        ff: {
          type: 'select',
          props: {
            style: {
              maxWidth: 300
            }
          },
          wrapperProps: {
            extra: '是否隐藏EE'
          },
          default: '是',
          enum: [
            '是',
            '否'
          ],
          title: 'FF'
        }
      }
    }
  }
};
