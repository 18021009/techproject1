import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

const data = [
  {
    path: '/root',
    type: 'folder',
    children: ['/root/david', '/root/jslancer'],
  },
  {
    path: '/root/david',
    type: 'folder',
    children: ['/root/david/readme.md'],
  },
  {
    path: '/root/david/readme.md',
    type: 'file',
    content: 'Thanks for reading me me. But there is nothing here.'
  },
  {
    path: '/root/jslancer',
    type: 'folder',
    children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
  },
  {
    path: '/root/jslancer/projects',
    type: 'folder',
    children: ['/root/jslancer/projects/treeview'],
  },
  {
    path: '/root/jslancer/projects/treeview',
    type: 'folder',
    children: [],
  },
  {
    path: '/root/jslancer/vblogs',
    type: 'folder',
    children: [],
  },
];

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: data,
    }
    this.getRootNodes = this.getRootNodes.bind(this);
    this.getChildNodes = this.getChildNodes.bind(this);
    this.onNodeSelect = this.onNodeSelect.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  getRootNodes() {
    return this.state.nodes[0];
  }

  getChildNodes(node) {
    var { nodes } = this.state;
    var childNode = [];
    if (node.children) {
      for (var j = 0; j < node.children.length; j++) {
        for (let i = 0; i < nodes.length; i++) {
          if (node.children[j] === nodes[i].path) {
            childNode.push(nodes[i]);
          }
        }
      }
      return childNode;
    }
    return []
  };

  onToggle = (node) => {
    const { nodes } = this.state;
    for (let i = 0; i < nodes.length; i++) {
      if(node.path === nodes[i].path){
        nodes[i].isOpen = !node.isOpen;
        this.setState({ nodes });
      }
    }
  }

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  }

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        <TreeNode
          node={rootNodes}
          getChildNodes={this.getChildNodes}
          onNodeSelect={this.onNodeSelect}
          onToggle={this.onToggle}
        />
      </div>
    )
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};