import { Nav } from 'react-bootstrap';
import React from 'react';
import Panel from './commons/Panel'
import UserProfile from './account/UserProfile'
import { useMemo} from 'react';
import { withRouter } from 'react-router-dom';

const NavBarEnd = props => {

    const userInfo = useMemo(() => {
        return global.auth.getUser() || {};
    }, []);

    const toProfile = () => {
        Panel.open({
          component: UserProfile,
          props: {
            user: userInfo
          },
          callback: data => {
            props.history.go(0);
          }
        });
    };

    return (
        <div className="end">
            <Nav className="mr-auto2">
                {userInfo.username ? (
                    <Nav.Link className="username" href=""onClick={toProfile}>
                    {"Hi, " + userInfo.username}
                    </Nav.Link>
                ) : (
                    <Nav.Link href="login">Login</Nav.Link>
                )}
                <Nav.Link href="cart">Cart</Nav.Link>
            </Nav>
        </div>
    );
}

export default withRouter(NavBarEnd);