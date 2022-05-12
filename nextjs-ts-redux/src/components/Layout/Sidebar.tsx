import React from 'react';
import Link from '../Link';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { createLoadingSelector } from 'store/loadingSelector';
import AuthActions, { authActionTypes } from 'store/auth/actions';

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadingSelector = createLoadingSelector([
    authActionTypes.LOGOUT,
  ]);
  const isSubmitting = useAppSelector((state: RootState) => loadingSelector(state));
  const { platform, user } = useAppSelector((state: RootState) => state.auth);

  const logout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    AuthActions.logout()(dispatch);
  };

  return (
    <div className="app-sidebar-container">
      <div className="app-sidebar-wrap wrapper">
        <div className="app-logo">
          <Link href="/dashboard">
            <a className="d-flex align-items-center" title="Admin Console">
              <span className="color-white">myApp for platforms</span>
            </a>
          </Link>
        </div>

        <div className="app-nav-links-wrap">
          <ul className="app-nav-links">
            <li className="app-nav-link">
              <Link href="/dashboard">
                <a title="Dashboard">
                  <i className="icon-dashboard"></i>
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="app-nav-link">
              <Link href="/userss">
                <a title="userss">
                  <i className="icon-college"></i>
                  userss
                </a>
              </Link>
            </li>
            <li className="app-nav-link">
              <Link href="/settings">
                <a title="Settings">
                  <i className="icon-team"></i>
                  Settings
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="app-nav-profile-wrap">
          <div className="app-nav-profile-bio">
            <p className="app-nav-profile-name">
              {user?.name}
            </p>
            <p className="app-nav-profile-role">
              {platform?.platform_name}
            </p>
            <ul className="app-nav-profile-actions">
              <li>
                <a className="btn-link" onClick={logout}>
                  {isSubmitting ? 'Logging out...' : 'Logout'}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
