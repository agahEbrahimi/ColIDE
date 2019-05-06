import React from 'react';
import MonacoEditor from 'react-monaco-editor';
const monaco = require('monaco-editor');

class Monaco extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      code: localStorage.getItem(this.props.name),
      eventRange: null, 
      eventString: "",
      change: null
    };

    this.onChange = this.onChange.bind(this);
    this.getChanges = this.getChanges.bind(this);
    this.applySync = this.applySync.bind(this);
    this.changeUpdate = this.changeUpdate.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.objectComparison = this.objectComparison.bind(this);
    this.getFileContent = this.getFileContent.bind(this);
    this.myref = React.createRef();
  }
  componentDidMount(){
    this.getFileContent();
    this.getChanges();
    this.onContentChange();
  }

  getFileContent(){
    fetch('http://localhost:4000/file/getFileContent', {
        method: 'POST',
        body: JSON.stringify({
          fileName: this.state.name,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
      }).then(results => results.text()).then(data => {
        localStorage.setItem(this.props.name, data);
        this.setState({code:data});
      });
  }

  editorDidMount(editor, monaco) {
    editor.focus();
  }

  changeUpdate(e){
    for(var i=0; i<e.changes.length; i++){
      e.changes[i].forceMoveMarkers = true;
      e.changes[i].rangeOffset = 0;
    }
    if(!this.objectComparison(e.changes, this.state.change)){
 
      fetch('http://localhost:4000/sync/sendUpdate', {
        method: 'POST',
        body: JSON.stringify({
          changes: e.changes,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
      });

    }

    this.setState({versionID: e.versionId});
  }

  onContentChange(){
    var comp = this;
    this.myref.current.editor.onDidChangeModelContent((event) => {
      var editorEvent = event;
      comp.changeUpdate(editorEvent);
    });
  }

  onChange(newValue, e) {
    this.setState({code:newValue});
    localStorage.setItem(this.props.name, newValue);
  }

  getChanges() {    
    var self=this;
    var eventSource = new EventSource("http://localhost:4000/sync/update");
    eventSource.addEventListener("message", function(event) {
      if(event.data!="online"){;
        const eventObj = JSON.parse((event.data).replace(/\\r\\n/g, '\n'));
        self.applySync(eventObj);
      }
    }, false);
  }; 

  applySync(changes){
    for(var i=0; i<changes.length; i++){
      this.setState({eventRange: changes[i].range, eventString: changes[i].text});
      changes[i].rangeOffset = 0;
      this.setState({change: changes})
      var range = new monaco.Range(changes[i].range.startLineNumber, changes[i].range.startColumn, changes[i].range.endLineNumber, changes[i].range.endColumn);
      var id = { major: 1, minor: 1 };             
      var text = changes[i].text;
      var op = {identifier: id, range: range, text: text, forceMoveMarkers: true};
      this.myref.current.editor.executeEdits("alex.cpp", [op]);
    }
  }
  objectComparison(obj1, obj2){
    return(JSON.stringify(obj1)==JSON.stringify(obj2));
  }
  render() {
    const options = {
      selectOnLineNumbers: true,
      automaticLayout:true
    };
    return (
        <MonacoEditor
          ref={this.myref}
          language="java"
          onChange={this.onChange}
          theme="vs-dark"
          className="moncaoEditor"
          value={this.state.code}
          options={options}
          editorDidMount={this.editorDidMount}
        />
    );
  }
}

export default Monaco;