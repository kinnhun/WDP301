
const SidebarAdmin = () => {
  return (
    <div>
         <div className="theme-setting-wrapper">
        <div id="settings-trigger"><i className="typcn typcn-cog-outline"></i></div>
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close typcn typcn-times"></i>
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options selected" id="sidebar-light-theme"><div className="img-ss rounded-circle bg-light border mr-3"></div>Light</div>
          <div className="sidebar-bg-options" id="sidebar-dark-theme"><div className="img-ss rounded-circle bg-dark border mr-3"></div>Dark</div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success"></div>
            <div className="tiles warning"></div>
            <div className="tiles danger"></div>
            <div className="tiles info"></div>
            <div className="tiles dark"></div>
            <div className="tiles default"></div>
          </div>
        </div>
      </div>
      <div id="right-sidebar" className="settings-panel">
        <i className="settings-close typcn typcn-times"></i>
        <ul className="nav nav-tabs" id="setting-panel" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
          </li>
        </ul>
        <div className="tab-content" id="setting-content">
          <div className="tab-pane fade show active scroll-wrapper" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
            <div className="add-items d-flex px-3 mb-0">
              <form className="form w-100">
                <div className="form-group d-flex">
                  <input type="text" className="form-control todo-list-input" placeholder="Add To-do"></input>
                  <button type="submit" className="add btn btn-primary todo-list-add-btn" id="add-task">Add</button>
                </div>
              </form>
            </div>
            <div className="list-wrapper px-3">
              <ul className="d-flex flex-column-reverse todo-list">
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox"></input>
                      Team review meeting at 3.00 PM
                    </label>
                  </div>
                  <i className="remove typcn typcn-delete-outline"></i>
                </li>
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox"></input>
                      Prepare for presentation
                    </label>
                  </div>
                  <i className="remove typcn typcn-delete-outline"></i>
                </li>
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox"></input>
                      Resolve all the low priority tickets due today
                    </label>
                  </div>
                  <i className="remove typcn typcn-delete-outline"></i>
                </li>
                <li className="completed">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" checked></input>
                      Schedule meeting for next week
                    </label>
                  </div>
                  <i className="remove typcn typcn-delete-outline"></i>
                </li>
                <li className="completed">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" checked></input>
                      Project review
                    </label>
                  </div>
                  <i className="remove typcn typcn-delete-outline"></i>
                </li>
              </ul>
            </div>
            <div className="events py-4 border-bottom px-3">
              <div className="wrapper d-flex mb-2">
                <i className="typcn typcn-media-record-outline text-primary mr-2"></i>
                <span>Feb 11 2018</span>
              </div>
              <p className="mb-0 font-weight-thin text-gray">Creating component page</p>
              <p className="text-gray mb-0">build a js based app</p>
            </div>
            <div className="events pt-4 px-3">
              <div className="wrapper d-flex mb-2">
                <i className="typcn typcn-media-record-outline text-primary mr-2"></i>
                <span>Feb 7 2018</span>
              </div>
              <p className="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
              <p className="text-gray mb-0 ">Call Sarah Graves</p>
            </div>
          </div>
          <div className="tab-pane fade" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
            <div className="d-flex align-items-center justify-content-between border-bottom">
              <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Friends</p>
              <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">See All</small>
            </div>
            <ul className="chat-list">
              <li className="list active">
                <div className="profile"><img src="images/faces/face1.jpg" alt="image"></img><span className="online"></span></div>
                <div className="info">
                  <p>Thomas Douglas</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">19 min</small>
              </li>
              <li className="list">
                <div className="profile"><img src="images/faces/face2.jpg" alt="image"></img><span className="offline"></span></div>
                <div className="info">
                  <div className="wrapper d-flex">
                    <p>Catherine</p>
                  </div>
                  <p>Away</p>
                </div>
                <div className="badge badge-success badge-pill my-auto mx-2">4</div>
                <small className="text-muted my-auto">23 min</small>
              </li>
              <li className="list">
                <div className="profile"><img src="images/faces/face3.jpg" alt="image"></img><span className="online"></span></div>
                <div className="info">
                  <p>Daniel Russell</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">14 min</small>
              </li>
              <li className="list">
                <div className="profile"><img src="images/faces/face4.jpg" alt="image"></img><span className="offline"></span></div>
                <div className="info">
                  <p>James Richardson</p>
                  <p>Away</p>
                </div>
                <small className="text-muted my-auto">2 min</small>
              </li>
              <li className="list">
                <div className="profile"><img src="images/faces/face5.jpg" alt="image"></img><span className="online"></span></div>
                <div className="info">
                  <p>Madeline Kennedy</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">5 min</small>
              </li>
              <li className="list">
                <div className="profile"><img src="images/faces/face6.jpg" alt="image"></img><span className="online"></span></div>
                <div className="info">
                  <p>Sarah Graves</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">47 min</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="index.html">
              <i className="typcn typcn-device-desktop menu-icon"></i>
              <span className="menu-title">Dashboard</span>
              <div className="badge badge-danger">new</div>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="typcn typcn-document-text menu-icon"></i>
              <span className="menu-title">UI Elements</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
              <i className="typcn typcn-film menu-icon"></i>
              <span className="menu-title">Form elements</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="form-elements">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><a className="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
              <i className="typcn typcn-chart-pie-outline menu-icon"></i>
              <span className="menu-title">Charts</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="charts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
              <i className="typcn typcn-th-small-outline menu-icon"></i>
              <span className="menu-title">Tables</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="tables">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/tables/basic-table.html">Basic table</a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
              <i className="typcn typcn-compass menu-icon"></i>
              <span className="menu-title">Icons</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="icons">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/icons/mdi.html">Mdi icons</a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <i className="typcn typcn-user-add-outline menu-icon"></i>
              <span className="menu-title">User Pages</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="auth">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
              <i className="typcn typcn-globe-outline menu-icon"></i>
              <span className="menu-title">Error pages</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="error">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://bootstrapdash.com/demo/polluxui-free/docs/documentation.html">
              <i className="typcn typcn-mortar-board menu-icon"></i>
              <span className="menu-title">Documentation</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default SidebarAdmin
