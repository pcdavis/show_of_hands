import _ from "lodash";
import React, { Component } from "react";
import './dashboard.css'
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchStacks } from "../actions";

class Dashboard extends Component {
//   componentDidMount() {
//     this.props.fetchStacks();
//   }

//   renderStacks() {
//     return _.map(this.props.stacks, stack => {
//       return (
//         <li className="list-group-item" key={stack.id}>
//           <Link to={`/stacks/${stack.id}`}>
//             {stack.title}
//           </Link>
//         </li>
//       );
//     });
//   }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/stacks/new">
            Add a Stack
          </Link>
        </div>
        <h3>Stacks</h3>
        <ul className="list-group">
        <li>Each stack will be an li </li>
          {/* {this.renderStacks()} */}
        </ul>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { stacks: state.stacks };
// }

// export default connect(mapStateToProps, { fetchStacks })(Dashboard);
export default Dashboard;