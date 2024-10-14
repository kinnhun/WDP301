const Header = () => {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-light navbar-bg">
				<a className="sidebar-toggle js-sidebar-toggle">
					<i className="hamburger align-self-center"></i>
				</a>

				<form className="d-none d-sm-inline-block">
					<div className="input-group input-group-navbar">
						<input type="text" className="form-control" placeholder="Search…" aria-label="Search"></input>
						<button className="btn" type="button">
							<i className="align-middle" data-feather="search"></i>
						</button>
					</div>
				</form>

				<ul className="navbar-nav d-none d-lg-flex">
					<li className="nav-item px-2 dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="megaDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							Mega Menu
						</a>
						<div className="dropdown-menu dropdown-menu-start dropdown-mega" aria-labelledby="megaDropdown">
							<div className="d-md-flex align-items-start justify-content-start">
								<div className="dropdown-mega-list">
									<div className="dropdown-header">UI Elements</div>
									<a className="dropdown-item" href="#">Alerts</a>
									<a className="dropdown-item" href="#">Buttons</a>
									<a className="dropdown-item" href="#">Cards</a>
									<a className="dropdown-item" href="#">Carousel</a>
									<a className="dropdown-item" href="#">General</a>
									<a className="dropdown-item" href="#">Grid</a>
									<a className="dropdown-item" href="#">Modals</a>
									<a className="dropdown-item" href="#">Tabs</a>
									<a className="dropdown-item" href="#">Typography</a>
								</div>
								<div className="dropdown-mega-list">
									<div className="dropdown-header">Forms</div>
									<a className="dropdown-item" href="#">Layouts</a>
									<a className="dropdown-item" href="#">Basic Inputs</a>
									<a className="dropdown-item" href="#">Input Groups</a>
									<a className="dropdown-item" href="#">Advanced Inputs</a>
									<a className="dropdown-item" href="#">Editors</a>
									<a className="dropdown-item" href="#">Validation</a>
									<a className="dropdown-item" href="#">Wizard</a>
								</div>
								<div className="dropdown-mega-list">
									<div className="dropdown-header">Tables</div>
									<a className="dropdown-item" href="#">Basic Tables</a>
									<a className="dropdown-item" href="#">Responsive Table</a>
									<a className="dropdown-item" href="#">Table with Buttons</a>
									<a className="dropdown-item" href="#">Column Search</a>
									<a className="dropdown-item" href="#">Muulti Selection</a>
									<a className="dropdown-item" href="#">Ajax Sourced Data</a>
								</div>
							</div>
						</div>
					</li>

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="resourcesDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							Resources
						</a>
						<div className="dropdown-menu" aria-labelledby="resourcesDropdown">
							<a className="dropdown-item" href="https://adminkit.io/" target="_blank"><i className="align-middle me-1" data-feather="home"></i>
								Homepage</a>
							<a className="dropdown-item" href="https://adminkit.io/docs/" target="_blank"><i className="align-middle me-1" data-feather="book-open"></i>
								Documentation</a>
							<a className="dropdown-item" href="https://adminkit.io/docs/getting-started/changelog/" target="_blank"><i className="align-middle me-1"
									data-feather="edit"></i> Changelog</a>
						</div>
					</li>
				</ul>

				<div className="navbar-collapse collapse">
					<ul className="navbar-nav navbar-align">
						<li className="nav-item dropdown">
							<a className="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-bs-toggle="dropdown">
								<div className="position-relative">
									<i className="align-middle" data-feather="bell"></i>
									<span className="indicator">4</span>
								</div>
							</a>
							<div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
								<div className="dropdown-menu-header">
									4 New Notifications
								</div>
								<div className="list-group">
									<a href="#" className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<i className="text-danger" data-feather="alert-circle"></i>
											</div>
											<div className="col-10">
												<div className="text-dark">Update completed</div>
												<div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
												<div className="text-muted small mt-1">30m ago</div>
											</div>
										</div>
									</a>
									<a href="#" className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<i className="text-warning" data-feather="bell"></i>
											</div>
											<div className="col-10">
												<div className="text-dark">Lorem ipsum</div>
												<div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
												<div className="text-muted small mt-1">2h ago</div>
											</div>
										</div>
									</a>
									<a href="#" className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<i className="text-primary" data-feather="home"></i>
											</div>
											<div className="col-10">
												<div className="text-dark">Login from 192.186.1.8</div>
												<div className="text-muted small mt-1">5h ago</div>
											</div>
										</div>
									</a>
									<a href="#" className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<i className="text-success" data-feather="user-plus"></i>
											</div>
											<div className="col-10">
												<div className="text-dark">New connection</div>
												<div className="text-muted small mt-1">Christina accepted your request.</div>
												<div className="text-muted small mt-1">14h ago</div>
											</div>
										</div>
									</a>
								</div>
								<div className="dropdown-menu-footer">
									<a href="#" className="text-muted">Show all notifications</a>
								</div>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown">
								<div className="position-relative">
									<i className="align-middle" data-feather="message-square"></i>
								</div>
							</a>
							<div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
								<div className="dropdown-menu-header">
									<div className="position-relative">
										4 New Messages
									</div>
								</div>
								<div className="list-group">
									<a href="#" className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<img src="img/avatars/avatar-5.jpg" className="avatar img-fluid rounded-circle" alt="Vanessa Tucker"></img>
											</div>
											<div className="col-10 ps-2">
												<div className="text-dark">Vanessa Tucker</div>
												<div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
												<div className="text-muted small mt-1">15m ago</div>
											</div>
										</div>
									</a>
									<a href="#" className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<img src="img/avatars/avatar-2.jpg" className="avatar img-fluid rounded-circle" alt="William Harris"></img>
											</div>
											<div className="col-10 ps-2">
												<div className="text-dark">William Harris</div>
												<div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
												<div className="text-muted small mt-1">2h ago</div>
											</div>
										</div>
									</a>
									<a href="#" className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<img src="img/avatars/avatar-4.jpg" className="avatar img-fluid rounded-circle" alt="Christina Mason"></img>
											</div>
											<div className="col-10 ps-2">
												<div className="text-dark">Christina Mason</div>
												<div className="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
												<div className="text-muted small mt-1">4h ago</div>
											</div>
										</div>
									</a>
									<a href="#" className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<img src="img/avatars/avatar-3.jpg" className="avatar img-fluid rounded-circle" alt="Sharon Lessman"></img>
											</div>
											<div className="col-10 ps-2">
												<div className="text-dark">Sharon Lessman</div>
												<div className="text-muted small mt-1">Aenean tellus metus, bibendum sed, posuere ac, mattis non.</div>
												<div className="text-muted small mt-1">5h ago</div>
											</div>
										</div>
									</a>
								</div>
								<div className="dropdown-menu-footer">
									<a href="#" className="text-muted">Show all messages</a>
								</div>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-flag dropdown-toggle" href="#" id="languageDropdown" data-bs-toggle="dropdown">
								<img src="img/flags/us.png" alt="English" />
							</a>
							<div className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
								<a className="dropdown-item" href="#">
									<img src="img/flags/us.png" alt="English" width="20" className="align-middle me-1" />
									<span className="align-middle">English</span>
								</a>
								<a className="dropdown-item" href="#">
									<img src="img/flags/es.png" alt="Spanish" width="20" className="align-middle me-1" />
									<span className="align-middle">Spanish</span>
								</a>
								<a className="dropdown-item" href="#">
									<img src="img/flags/ru.png" alt="Russian" width="20" className="align-middle me-1" />
									<span className="align-middle">Russian</span>
								</a>
								<a className="dropdown-item" href="#">
									<img src="img/flags/de.png" alt="German" width="20" className="align-middle me-1" />
									<span className="align-middle">German</span>
								</a>
							</div>
						</li>
						<li className="nav-item">
							<a className="nav-icon js-fullscreen d-none d-lg-block" href="#">
								<div className="position-relative">
									<i className="align-middle" data-feather="maximize"></i>
								</div>
							</a>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-icon pe-md-0 dropdown-toggle" href="#" data-bs-toggle="dropdown">
								<img src="img/avatars/avatar.jpg" className="avatar img-fluid rounded" alt="Charles Hall" />
							</a>
							<div className="dropdown-menu dropdown-menu-end">
								<a className="dropdown-item" href="/profile"><i className="align-middle me-1" data-feather="user"></i> Profile</a>
								<a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="pages-settings.html"><i className="align-middle me-1" data-feather="settings"></i> Settings &
									Privacy</a>
								<a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="#">Log out</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
        </div>
    );
};

export default Header;
