import React from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { useActiveCode } from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";

const reactButtonCode = `export default function App() {
    return <h1>Hello Sandpack</h1>
  }`;
const costomSanpack = `import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
  } from "@codesandbox/sandpack-react";
  
  export default const CustomSandpack = () => (
    <SandpackProvider template="react">
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );`;

const simpleCode = ` export default const SimpleCodeViewer = () => {
    const { sandpack } = useSandpack();
    const { files, activePath } = sandpack;
  
    const code = files[activePath].code;
    return <pre>{code}</pre>;
  };`

const app = `import React from 'react';

  export default class App extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
      return (
        <div>app</div>
      )
    }
  }`;

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app : app,
        }
    }

    updateCode(){
        this.setState({
            app: new Date()
        })
    }

    render() {
        console.log('re render');
        return (
            <Sandpack
                template="react"
                files={{
                    "/App.js": this.state.app,
                    "/costomSanpack.js": costomSanpack,
                    "/simpleCode.js": simpleCode
                }}
                options={{
                    openPaths: ["/costomSanpack.js", "/App.js", "/simpleCode.js"],
                    activePath: this.props.activePath,
                }}
                onChange={this.updateCode}
            />
        )
    }
}