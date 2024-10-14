
const Sidebar = () => {
    const baseUrl = import.meta.env.VITE_PUBLIC_URL;

    return (
        <div>
            <div >
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <span className="sidebar-brand-text align-middle">
                                AdminKit
                                <sup><small className="badge bg-primary text-uppercase">Pro</small></sup>
                            </span>

                        </a>

                        <div className="sidebar-user">
                            <div className="d-flex justify-content-center">
                                <div className="flex-shrink-0">
                                    <img src="img/avatars/avatar.jpg" className="avatar img-fluid rounded me-1" alt="Charles Hall" />
                                </div>
                                <div className="flex-grow-1 ps-2">
                                    <a className="sidebar-user-title dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                        Charles Hall
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-start">
                                        <a className="dropdown-item" href="pages-profile.html"><i className="align-middle me-1" data-feather="user"></i> Profile</a>
                                        <a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="pages-settings.html"><i className="align-middle me-1" data-feather="settings"></i> Settings &
                                            Privacy</a>
                                        <a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Log out</a>
                                    </div>

                                    <div className="sidebar-user-subtitle">Designer</div>
                                </div>
                            </div>
                        </li>

                        <li className="side-nav-title side-nav-item">Apps</li>

                        <li className="side-nav-item">
                            <a href="apps-calendar.html" className="side-nav-link">
                                <i className="uil-calender"></i>
                                <span> Calendar </span>
                            </a>
                        </li>

                        <li className="side-nav-item">
                            <a href="apps-chat.html" className="side-nav-link">
                                <i className="uil-comments-alt"></i>
                                <span> Chat </span>
                            </a>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarCrm" aria-expanded="false" aria-controls="sidebarCrm" className="side-nav-link">
                                <i className="uil uil-tachometer-fast"></i>
                                <span className="badge bg-danger text-white float-end">New</span>
                                <span> CRM </span>
                            </a>
                            <div className="collapse" id="sidebarCrm">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="crm-dashboard.html">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="crm-projects.html">Project</a>
                                    </li>
                                    <li>
                                        <a href="crm-orders-list.html">Orders List</a>
                                    </li>
                                    <li>
                                        <a href="crm-clients.html">Clients</a>
                                    </li>
                                    <li>
                                        <a href="crm-management.html">Management</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" className="side-nav-link">
                                <i className="uil-store"></i>
                                <span> Ecommerce </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarEcommerce">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="apps-ecommerce-products.html">Products</a>
                                    </li>
                                    <li>
                                        <a href="apps-ecommerce-products-details.html">Products Details</a>
                                    </li>
                                    <li>
                                        <a href="apps-ecommerce-orders.html">Orders</a>
                                    </li>
                                    <li>
                                        <a href="apps-ecommerce-orders-details.html">Order Details</a>
                                    </li>
                                    <li>
                                        <a href="apps-ecommerce-customers.html">Customers</a>
                                    </li>
                                    <li>
                                        <a href="apps-ecommerce-shopping-cart.html">Shopping Cart</a>
                                    </li>
                                    <li>
                                        <a href="apps-ecommerce-checkout.html">Checkout</a>
                                    </li>
                                    <li>
                                        <a href="apps-ecommerce-sellers.html">Sellers</a>
                                    </li>
                                </ul>
                            </div>
                        </li>


                           
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="pages-profile.html">
                                    <i className="align-middle" data-feather="user"></i> <span className="align-middle">Profile</span>
                                </a>
                            </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarTasks" aria-expanded="false" aria-controls="sidebarTasks" className="side-nav-link">
                                <i className="uil-clipboard-alt"></i>
                                <span> Tasks </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarTasks">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="apps-tasks.html">List</a>
                                    </li>
                                    <li>
                                        <a href="apps-tasks-details.html">Details</a>
                                    </li>
                                    <li>
                                        <a href="apps-kanban.html">Kanban Board</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a href="apps-file-manager.html" className="side-nav-link">
                                <i className="uil-folder-plus"></i>
                                <span> File Manager </span>
                            </a>
                        </li>

                        <li className="side-nav-title side-nav-item">Custom</li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarPages" aria-expanded="false" aria-controls="sidebarPages" className="side-nav-link">
                                <i className="uil-copy-alt"></i>
                                <span> Pages </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarPages">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="pages-profile.html">Profile</a>
                                    </li>
                                    <li>
                                        <a href="pages-profile-2.html">Profile 2</a>
                                    </li>
                                    <li>
                                        <a href="pages-invoice.html">Invoice</a>
                                    </li>
                                    <li>
                                        <a href="pages-faq.html">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="pages-pricing.html">Pricing</a>
                                    </li>
                                    <li>
                                        <a href="pages-maintenance.html">Maintenance</a>
                                    </li>
                                    <li className="side-nav-item">
                                        <a data-bs-toggle="collapse" href="#sidebarPagesAuth" aria-expanded="false" aria-controls="sidebarPagesAuth">
                                            <span> Authentication </span>
                                            <span className="menu-arrow"></span>
                                        </a>
                                        <div className="collapse" id="sidebarPagesAuth">
                                            <ul className="side-nav-third-level">
                                                <li>
                                                    <a href="pages-login.html">Login</a>
                                                </li>
                                                <li>
                                                    <a href="pages-login-2.html">Login 2</a>
                                                </li>
                                                <li>
                                                    <a href="pages-register.html">Register</a>
                                                </li>
                                                <li>
                                                    <a href="pages-register-2.html">Register 2</a>
                                                </li>
                                                <li>
                                                    <a href="pages-logout.html">Logout</a>
                                                </li>
                                                <li>
                                                    <a href="pages-logout-2.html">Logout 2</a>
                                                </li>
                                                <li>
                                                    <a href="pages-recoverpw.html">Recover Password</a>
                                                </li>
                                                <li>
                                                    <a href="pages-recoverpw-2.html">Recover Password 2</a>
                                                </li>
                                                <li>
                                                    <a href="pages-lock-screen.html">Lock Screen</a>
                                                </li>
                                                <li>
                                                    <a href="pages-lock-screen-2.html">Lock Screen 2</a>
                                                </li>
                                                <li>
                                                    <a href="pages-confirm-mail.html">Confirm Mail</a>
                                                </li>
                                                <li>
                                                    <a href="pages-confirm-mail-2.html">Confirm Mail 2</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="side-nav-item">
                                        <a data-bs-toggle="collapse" href="#sidebarPagesError" aria-expanded="false" aria-controls="sidebarPagesError">
                                            <span> Error </span>
                                            <span className="menu-arrow"></span>
                                        </a>
                                        <div className="collapse" id="sidebarPagesError">
                                            <ul className="side-nav-third-level">
                                                <li>
                                                    <a href="pages-404.html">Error 404</a>
                                                </li>
                                                <li>
                                                    <a href="pages-404-alt.html">Error 404-alt</a>
                                                </li>
                                                <li>
                                                    <a href="pages-500.html">Error 500</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="pages-starter.html">Starter Page</a>
                                    </li>
                                    <li>
                                        <a href="pages-preloader.html">With Preloader</a>
                                    </li>
                                    <li>
                                        <a href="pages-timeline.html">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a href="landing.html" target="_blank" className="side-nav-link">
                                <i className="uil-globe"></i>
                                <span className="badge bg-secondary text-light float-end">New</span>
                                <span> Landing </span>
                            </a>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarLayouts" aria-expanded="false" aria-controls="sidebarLayouts" className="side-nav-link">
                                <i className="uil-window"></i>
                                <span> Layouts </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarLayouts">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="layouts-horizontal.html">Horizontal</a>
                                    </li>
                                    <li>
                                        <a href="layouts-detached.html">Detached</a>
                                    </li>
                                    <li>
                                        <a href="layouts-full.html">Full</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-title side-nav-item mt-1">Components</li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarBaseUI" aria-expanded="false" aria-controls="sidebarBaseUI" className="side-nav-link">
                                <i className="uil-box"></i>
                                <span> Base UI </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarBaseUI">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="ui-accordions.html">Accordions</a>
                                    </li>
                                    <li>
                                        <a href="ui-alerts.html">Alerts</a>
                                    </li>
                                    <li>
                                        <a href="ui-avatars.html">Avatars</a>
                                    </li>
                                    <li>
                                        <a href="ui-badges.html">Badges</a>
                                    </li>
                                    <li>
                                        <a href="ui-breadcrumb.html">Breadcrumb</a>
                                    </li>
                                    <li>
                                        <a href="ui-buttons.html">Buttons</a>
                                    </li>
                                    <li>
                                        <a href="ui-cards.html">Cards</a>
                                    </li>
                                    <li>
                                        <a href="ui-carousel.html">Carousel</a>
                                    </li>
                                    <li>
                                        <a href="ui-dropdowns.html">Dropdowns</a>
                                    </li>
                                    <li>
                                        <a href="ui-embed-video.html">Embed Video</a>
                                    </li>
                                    <li>
                                        <a href="ui-grid.html">Grid</a>
                                    </li>
                                    <li>
                                        <a href="ui-list-group.html">List Group</a>
                                    </li>
                                    <li>
                                        <a href="ui-modals.html">Modals</a>
                                    </li>
                                    <li>
                                        <a href="ui-notifications.html">Notifications</a>
                                    </li>
                                    <li>
                                        <a href="ui-offcanvas.html">Offcanvas</a>
                                    </li>
                                    <li>
                                        <a href="ui-placeholders.html">Placeholders</a>
                                    </li>
                                    <li>
                                        <a href="ui-pagination.html">Pagination</a>
                                    </li>
                                    <li>
                                        <a href="ui-popovers.html">Popovers</a>
                                    </li>
                                    <li>
                                        <a href="ui-progress.html">Progress</a>
                                    </li>
                                    <li>
                                        <a href="ui-ribbons.html">Ribbons</a>
                                    </li>
                                    <li>
                                        <a href="ui-spinners.html">Spinners</a>
                                    </li>
                                    <li>
                                        <a href="ui-tabs.html">Tabs</a>
                                    </li>
                                    <li>
                                        <a href="ui-tooltips.html">Tooltips</a>
                                    </li>
                                    <li>
                                        <a href="ui-typography.html">Typography</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarExtendedUI" aria-expanded="false" aria-controls="sidebarExtendedUI" className="side-nav-link">
                                <i className="uil-package"></i>
                                <span> Extended UI </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarExtendedUI">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="extended-dragula.html">Dragula</a>
                                    </li>
                                    <li>
                                        <a href="extended-range-slider.html">Range Slider</a>
                                    </li>
                                    <li>
                                        <a href="extended-ratings.html">Ratings</a>
                                    </li>
                                    <li>
                                        <a href="extended-scrollbar.html">Scrollbar</a>
                                    </li>
                                    <li>
                                        <a href="extended-scrollspy.html">Scrollspy</a>
                                    </li>
                                    <li>
                                        <a href="extended-treeview.html">Treeview</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a href="widgets.html" className="side-nav-link">
                                <i className="uil-layer-group"></i>
                                <span> Widgets </span>
                            </a>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarIcons" aria-expanded="false" aria-controls="sidebarIcons" className="side-nav-link">
                                <i className="uil-streering"></i>
                                <span> Icons </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarIcons">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="icons-dripicons.html">Dripicons</a>
                                    </li>
                                    <li>
                                        <a href="icons-mdi.html">Material Design</a>
                                    </li>
                                    <li>
                                        <a href="icons-unicons.html">Unicons</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarForms" aria-expanded="false" aria-controls="sidebarForms" className="side-nav-link">
                                <i className="uil-document-layout-center"></i>
                                <span> Forms </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarForms">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="form-elements.html">Basic Elements</a>
                                    </li>
                                    <li>
                                        <a href="form-advanced.html">Form Advanced</a>
                                    </li>
                                    <li>
                                        <a href="form-validation.html">Validation</a>
                                    </li>
                                    <li>
                                        <a href="form-wizard.html">Wizard</a>
                                    </li>
                                    <li>
                                        <a href="form-fileuploads.html">File Uploads</a>
                                    </li>
                                    <li>
                                        <a href="form-editors.html">Editors</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarCharts" aria-expanded="false" aria-controls="sidebarCharts" className="side-nav-link">
                                <i className="uil-chart"></i>
                                <span> Charts </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarCharts">
                                <ul className="side-nav-second-level">
                                    <li className="side-nav-item">
                                        <a data-bs-toggle="collapse" href="#sidebarApexCharts" aria-expanded="false" aria-controls="sidebarApexCharts">
                                            <span> Apex Charts </span>
                                            <span className="menu-arrow"></span>
                                        </a>
                                        <div className="collapse" id="sidebarApexCharts">
                                            <ul className="side-nav-third-level">
                                                <li>
                                                    <a href="charts-apex-area.html">Area</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-bar.html">Bar</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-bubble.html">Bubble</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-candlestick.html">Candlestick</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-column.html">Column</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-heatmap.html">Heatmap</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-line.html">Line</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-mixed.html">Mixed</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-pie.html">Pie</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-radar.html">Radar</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-radialbar.html">RadialBar</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-scatter.html">Scatter</a>
                                                </li>
                                                <li>
                                                    <a href="charts-apex-sparklines.html">Sparklines</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="charts-brite.html">Britecharts</a>
                                    </li>
                                    <li>
                                        <a href="charts-chartjs.html">Chartjs</a>
                                    </li>
                                    <li>
                                        <a href="charts-sparkline.html">Sparklines</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarTables" aria-expanded="false" aria-controls="sidebarTables" className="side-nav-link">
                                <i className="uil-table"></i>
                                <span> Tables </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarTables">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="tables-basic.html">Basic Tables</a>
                                    </li>
                                    <li>
                                        <a href="tables-datatable.html">Data Tables</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarMaps" aria-expanded="false" aria-controls="sidebarMaps" className="side-nav-link">
                                <i className="uil-location-point"></i>
                                <span> Maps </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarMaps">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="maps-google.html">Google Maps</a>
                                    </li>
                                    <li>
                                        <a href="maps-vector.html">Vector Maps</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarMultiLevel" aria-expanded="false" aria-controls="sidebarMultiLevel" className="side-nav-link">
                                <i className="uil-folder-plus"></i>
                                <span> Multi Level </span>
                                <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarMultiLevel">
                                <ul className="side-nav-second-level">
                                    <li className="side-nav-item">
                                        <a data-bs-toggle="collapse" href="#sidebarSecondLevel" aria-expanded="false" aria-controls="sidebarSecondLevel">
                                            <span> Second Level </span>
                                            <span className="menu-arrow"></span>
                                        </a>
                                        <div className="collapse" id="sidebarSecondLevel">
                                            <ul className="side-nav-third-level">
                                                <li>
                                                    <a href="javascript: void(0);">Item 1</a>
                                                </li>
                                                <li>
                                                    <a href="javascript: void(0);">Item 2</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="side-nav-item">
                                        <a data-bs-toggle="collapse" href="#sidebarThirdLevel" aria-expanded="false" aria-controls="sidebarThirdLevel">
                                            <span> Third Level </span>
                                            <span className="menu-arrow"></span>
                                        </a>
                                        <div className="collapse" id="sidebarThirdLevel">
                                            <ul className="side-nav-third-level">
                                                <li>
                                                    <a href="javascript: void(0);">Item 1</a>
                                                </li>
                                                <li className="side-nav-item">
                                                    <a data-bs-toggle="collapse" href="#sidebarFourthLevel" aria-expanded="false" aria-controls="sidebarFourthLevel">
                                                        <span> Item 2 </span>
                                                        <span className="menu-arrow"></span>
                                                    </a>
                                                    <div className="collapse" id="sidebarFourthLevel">
                                                        <ul className="side-nav-forth-level">
                                                            <li>
                                                                <a href="javascript: void(0);">Item 2.1</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript: void(0);">Item 2.2</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    {/* <!-- Help Box --> */}
                    <div className="help-box text-white text-center">
                        <a href="javascript: void(0);" className="float-end close-btn text-white">
                            <i className="mdi mdi-close"></i>
                        </a>
                        <img src="assets/images/help-icon.svg" height="90" alt="Helper Icon Image" />
                        <h5 className="mt-3">Unlimited Access</h5>
                        <p className="mb-3">Upgrade to plan to get access to unlimited reports</p>
                        <a href="javascript: void(0);" className="btn btn-secondary btn-sm">Upgrade</a>
                    </div>
                    {/* <!-- end Help Box --> */}
                    {/* <!-- End Sidebar --> */}

                    <div className="clearfix"></div>

                </div>
                {/* <!-- Sidebar -left --> */}

            </div>
            {/* <!-- Left Sidebar End --> */}

        </div>
    )
}

export default Sidebar
