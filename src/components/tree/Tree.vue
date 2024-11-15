<template>
    <div>
        <p v-if="filteredNodes.length === 0" :class="{'tree-list': treeOptions.filter.emptyText}">
            {{ treeOptions.filter.emptyText || "Nenhum item encontrado" }}
        </p>        
        <node
          v-for="node in filteredNodes"
          :key="node.id"
          :node="node"
          @toggle="toggleNode"
          @node-selected="onNodeSelected"
          :treeOptions="treeOptions"
        />        
    </div>
</template>

<script>
  import Node from './Node.vue';
  
  export default {
    name: "Tree",
    components: { Node },
    props: {
        nodes: {
            type: Array,
            required: true,
        },
        filter: {
            type: String,
            default: '',
        },
        treeOptions: {
            type: Object,
            default: () => ({
                propertyNames: { text: 'label' },
                filter: { emptyText: 'Nenhum item encontrado' },
            }),
        }
    },
    computed: {
        filteredNodes() {
            if (!this.filter) return this.nodes;
            return this.filterNodes(this.nodes, this.filter);
        },
    },
    methods: {
      toggleNode(nodeId) {
        const node = this.findNode(this.nodes, nodeId);
        if (node) {
          node.expanded = !node.expanded;
        }
      },
      findNode(nodes, id) {
        for (const node of nodes) {
          if (node.id === id) return node;
          if (node.children) {
            const found = this.findNode(node.children, id);
            if (found) return found;
          }
        }
        return null;
      },
      filterNodes(nodes, filter) {
        return nodes
          .map(node => {
          const matchesFilter = node.name
              .toLowerCase()
              .includes(filter.toLowerCase());

          const filteredChildren = node.children
              ? this.filterNodes(node.children, filter)
              : [];

          if (matchesFilter || filteredChildren.length > 0) {
              return {
              ...node,
              expanded: true,
              children: filteredChildren,
              };
          }
          })
          .filter(node => node !== undefined);
      },
      onNodeSelected(node) {        
        this.$emit('node-selected', node);
      }
    },
  };
</script>
  
<style>
    .tree-list {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    .slide-in-left-enter-active,
    .slide-in-left-leave-active {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .slide-in-left-enter {
      opacity: 0;
      transform: translateX(-20px);
    }

    .slide-in-left-enter-to {
      opacity: 1;
      transform: translateX(0);
    }

    .slide-in-left-leave {
      opacity: 1;
      transform: translateX(0);
    }

    .slide-in-left-leave-to {
      opacity: 0;
      transform: translateX(-20px);
    }
</style>
