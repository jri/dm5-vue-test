<template>
  <div id="tree-panel">
    <h3>Tree</h3>
    <user-select></user-select>
    <vue-tree :tree="tree"></vue-tree>
  </div>
</template>

<script>
import UserSelect from "./user-select.vue"
import VueTree    from "./vue-tree.vue"

export default {
  components: {
    UserSelect, VueTree
  },
  data() {
    return {
      tree: {
        "id": 2973,
        "nodes": [
          {
            "id": 4528,
            "infobit": {
              "id": 4511,
              "title": "Africa",
              "type": "infobits.type.infobit",
              "creator": "admin",
              "created": 1481507383895
            },
            "nodes": [
              {
                "id": 4584,
                "infobit": {
                  "id": 4463,
                  "title": "Mali",
                  "type": "infobits.type.infobit",
                  "creator": "admin",
                  "created": 1481480336901
                },
                "nodes": [],
                "collapsed": false
              },
              {
                "id": 4598,
                "infobit": {
                  "id": 4494,
                  "title": "Asia",
                  "type": "infobits.type.infobit",
                  "creator": "admin",
                  "created": 1481507380918
                },
                "nodes": [
                  {
                    "id": 4626,
                    "infobit": {
                      "id": 142,
                      "title": "Syrien",
                      "type": "infobits.type.infobit",
                      "creator": "admin",
                      "created": 1481480330241
                    },
                    "nodes": [],
                    "collapsed": false
                  },
                  {
                    "id": 4612,
                    "infobit": {
                      "id": 4432,
                      "title": "Jemen",
                      "type": "infobits.type.infobit",
                      "creator": "admin",
                      "created": 1481480334625
                    },
                    "nodes": [],
                    "collapsed": false
                  }
                ],
                "collapsed": false
              }
            ],
            "collapsed": false
          }
        ],
        "collapsed": false
      }
    }
  }
}
</script>

<style>
#tree-panel {
  flex-basis: 40%;
  overflow: auto;
  background-color: white;
}
</style>
