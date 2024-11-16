<template>
    <li :class="['menu-item', { 'open selected' : node.expanded }, {'active' : isActive}]">
        <div @click="selectNode">            
            <a :class="['menu-link', {'menu-toggle': hasChildren}]">
                <div class="text-truncate" style="color: var(--bs-color-card-text)" :data-name="node.name">{{ node.name }}</div>
            </a>
        </div>
        <transition name="slide-in-left">
          <ul class="menu-sub" v-if="node.expanded && hasChildren">
              <node
                v-for="child in node.children"
                :key="child.id"
                :node="child"
                @toggle="$emit('toggle', $event)"
                @node-selected="$emit('node-selected', $event)"
                style="margin-left: 25px;"
              />
          </ul>
        </transition>
    </li>
  </template>
  
  <script>
  export default {
    name: "Node",
    data() {
      return {
        isActive : false
      }
    },
    props: {
      node: {
        type: Object,
        required: true,
      },
    },
    computed: {
      hasChildren() {
        return this.node.children && this.node.children.length > 0;
      },
    },
    methods: {
      selectNode() {
        let subMenuItems = document.querySelectorAll('.menu-sub > .menu-item');
        subMenuItems.forEach(item => item.classList.remove('active'));
        
        this.isActive = true
        this.$emit("node-selected", this.node); 
        this.$emit("toggle", this.node.id);
      }
    },
  };
  </script>
  
  <style>
  .menu-item .menu-link {
    cursor: pointer;
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
  