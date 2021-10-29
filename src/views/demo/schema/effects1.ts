export default {
  fields: {
    $card1: {
      fields: {
        f1: {
          type: "object",
          fields: {
            aa: {
              type: "expand-select",
              default: true,
              enum: [
                {
                  label: "是",
                  value: true
                },
                {
                  label: "否",
                  value: false
                }
              ],
              title: "是否隐藏AA"
            },
            bb: {
              type: "string",
              title: "AA"
            },
            cc: {
              type: "expand-select",
              default: true,
              enum: [{
                  label: "是",
                  value: true
                }, {
                  label: "否",
                  value: false
                }
              ],
              title: "是否隐藏Block2"
            }
          }
        }
      },
      props: {
        title: "Block1"
      },
      type: "card"
    },
    $card2: {
      type: "card",
      props: {
        title: "Block2"
      },
      fields: {
        dd: {
          type: "object",
          fields: {
            ee: {
              type: "date",
              title: "EE"
            },
            ff: {
              type: "number",
              title: "FF",
              required: true
            }
          }
        }
      }
    },
    $card3: {
      type: "card",
      props: {
        title: "Block3"
      },
      fields: {
        kk: {
          type: "object",
          fields: {
            gg: {
              type: "string",
              props: {
                showSearch: true,
                filterLocal: false
              },
              title: "GG"
            },
            hh: {
              type: "string",
              title: "HH"
            },
            mm: {
              type: "string",
              title: "MM"
            }
          }
        }
      }
    }
  }
}
