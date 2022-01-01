import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';
import Editor from './Editor';

const StyledFileExplorer = styled.div`
  margin: 0 auto;
  display: flex;  
`;

const TreeWrapper = styled.div`
  width: 250px;
`;

export default class FileExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      openPaths: ["/App.js", "/button.js", "/index.js"],
      activePath: "/index.js",
    }
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = (file) => this.setState({ selectedFile: file });

  render() {
    const { selectedFile } = this.state;

    return (
      <StyledFileExplorer>
        <TreeWrapper>
          <Tree onSelect={this.onSelect} />
        </TreeWrapper>
        <Editor
          openPaths={this.state.openPaths}
          activePath={this.state.activePath}
        />
      </StyledFileExplorer>
    )
  }
}