import React from 'react';
import {cyan600, pink600} from 'material-ui/styles/colors';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import InfoBox from '../components/dashboard/InfoBox';
import globalStyles from '../styles';

const DashboardPage = (props) => {
  var {pageName, rooms, users} = props;
  return (
    <div>
      <h3 style={globalStyles.navigation}>{pageName}</h3>

      <div className="row">

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ShoppingCart}
                   color={pink600}
                   title="Tổng khóa học"
                   value={rooms.length}
          />
        </div>


        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ThumbUp}
                   color={cyan600}
                   title="Tổng thành viên"
                   value={users.length}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;