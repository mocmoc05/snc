import React from 'react';
import { Link, browserHistory } from 'react-router';
import TinyMCE from 'react-tinymce';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import { grey400 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import Data from '../data';
const styles = {
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  },
  checkbox: {
    marginBottom: 16,
  }
};


export default class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ckldata: {},
      formData: {},
      ...props
    }
  }

  setFormValue(field, data) {
    var dt = this.state.formData;
    dt[field.field] = data;
    this.setState({
      data: dt
    });
  }

  render() {
    return (
      <PageBase title={this.state.pageName}
        navigation={`${Data.appName} / ${this.props.pageName}`}>
        <form>
          {this.props.columns.map(x => {
            switch (x.type) {
              case "TEXT":
                return <TextField
                  onChange={(text) => this.setFormValue(x, text.target.value)}
                  defaultValue={this.state.formData[x.field]}
                  hintText={x.text}
                  floatingLabelText={x.text}
                  fullWidth={true}
                  defaultValue={this.state.formData[x.field]}
                />
                break;

              case "EMAIL":
                return <TextField
                  onChange={(text) => this.setFormValue(x, text.target.value)}
                  hintText={x.text}
                  floatingLabelText={x.text}
                  fullWidth={true}
                  defaultValue={this.state.formData[x.field]}
                  type="email"
                />
                break;

              case "PASS":
                return <TextField
                  onChange={(text) => this.setFormValue(x, text.target.value)}
                  hintText={x.text}
                  floatingLabelText={x.text}
                  fullWidth={true}
                  type="password"
                />
                break;

              case "HTML":
                return <TinyMCE
                  onChange={(text) => this.setFormValue(x, text.target.getContent())}
                  content={this.state.formData[x.field]}
                  config={{
                    plugins: 'autolink link image lists print preview',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                  }}

                />
                break;

              case "CCB":
                return <SelectField
                  floatingLabelText={x.text}
                  onChange={(event, index, value) => {
                    var dt = this.state.formData;
                    dt[x.field] = value;
                    this.setState({
                      data: dt
                    });
                  }}
                  value={this.state.formData[x.field]}
                  fullWidth={true}>
                  {this.props.data[x.field].map(element => {
                    return <MenuItem value={element[x.dataKey]} key={element[x.dataKey]} primaryText={element[x.dataDisplay]} />
                  })
                  }
                </SelectField>
                break;
              case "CKL":
                return <List>
                  <Subheader>{x.text}</Subheader>
                  {this.props.data[x.field].map(element => {
                    return <ListItem
                      key={element[x.dataKey]}
                      leftCheckbox={
                        <Checkbox
                          onCheck={(check) => {
                            // element.checked = check.target.checked;
                            var dv = this.state.ckldata;
                            if (check.target.checked) {
                              if (dv[x.field]) {
                                if (!(dv[x.field].indexOf(element) > -1)) {
                                  dv[x.field].push(element);
                                }
                              } else {
                                dv[x.field] = [element];
                              }

                            } else {
                              if (dv[x.field]) {
                                if (dv[x.field].indexOf(element) > -1) {
                                  dv[x.field].splice(element, 1);
                                }
                              }

                            }
                            this.setState({
                              ckldata: dv
                            })
                            this.setFormValue(x, dv[x.field]);
                          }} />
                      }
                      primaryText={element[x.dataDisplay]}
                      secondaryText={element[x.dataKey]}
                    />
                  })
                  }
                </List>
                break;

              case "DTE":
                <DatePicker
                  onChange={(text) => setFormValue(x.field, text)}
                  hintText={x.text}
                  floatingLabelText={x.text}
                  fullWidth={true} />
                break;
              case "RDB":
                <div style={styles.toggleDiv}>
                  <Toggle
                    onChange={(text) => setFormValue(x.field, text)}
                    label={x.text}
                    labelStyle={styles.toggleLabel}
                  />
                </div>
                break;
            }
          }
          )}

          <Divider />

          <div style={styles.buttons}>
            <Link to="/">
              <RaisedButton label="Cancel" onClick={() => browserHistory.goBack()} />
            </Link>

            <RaisedButton label="Lưu lại"
              style={styles.saveButton}
              type="button"
              onClick={() => this.props.onPost(this.state.formData)}
              primary={true} />
          </div>
        </form>
      </PageBase>
    );
  }
};
