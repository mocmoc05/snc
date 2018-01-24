import React from 'react';
import { Link } from 'react-router';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { pink500, grey200, grey500, red500 } from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../data';

const TablePage = (props) => {
  console.log(props);
  var { data, pageName, columns, action, refreshData, onDelete, onEdit } = props;

  const styles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    editButton: {
      fill: grey500
    },
    deleteButton: {
      fill: red500
    }
  };
  var cols = columns.filter(x=>x.showGrid==true);
  var priKey = columns.filter(x => x.priKey == true)[0];
  console.log(priKey);

  return (
    <PageBase title={pageName} navigation={Data.appName+" / " + pageName}>
      <div>
        <Link to={action.create.form} >
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
            {action.create.icon}
          </FloatingActionButton>
        </Link>

        <Table>
          <TableHeader>
            <TableRow>
              {cols.map(item =>
                <TableHeaderColumn key={item.field}>{item.text}</TableHeaderColumn>
              )}
              <TableHeaderColumn>Hành động</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(dt =>
              <TableRow key={dt.id}>
                {cols.map(cl =>
                  <TableRowColumn key={cl.field}>{dt[cl.field]}</TableRowColumn>
                )}
                <TableRowColumn>
                  <FloatingActionButton zDepth={0}
                    mini={true}
                    backgroundColor={grey200}
                    iconStyle={styles.editButton}
                    onClick={()=>onEdit(dt)}
                  >
                    {action.update.icon}
                  </FloatingActionButton>
                  <FloatingActionButton zDepth={0}
                    mini={true}
                    backgroundColor={grey200}
                    iconStyle={styles.editButton}
                    onClick={() => {
                      onDelete(dt[priKey.field]);
                    }}
                  >
                    {action.delete.icon}
                  </FloatingActionButton>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageBase>
  );
};

export default TablePage;