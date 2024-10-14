const Profile = () => {
    return (
        <div>
            {/* Start Content */}
            <div className="container-fluid">

                {/* Start page title */}
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"> <a href="#"> Hyper</a> </li>
                                    <li className="breadcrumb-item"> <a href="#"> Pages</a> </li>
                                    <li className="breadcrumb-item active"> Profile 2</li>
                                </ol>
                            </div>
                            <h4 className="page-title">Profile 2</h4>
                        </div>
                    </div>
                </div>
                {/* End page title */}

                <div className="row">
                    <div className="col-xl-4 col-lg-5">

                        <div className="card text-center">
                            <div className="card-body">
                                <img
                                    src="assets/images/users/avatar-1.jpg"
                                    className="rounded-circle avatar-lg img-thumbnail"
                                    alt="profile-image"
                                />

                                <h4 className="mb-0 mt-2">Dominic Keller</h4>
                                <p className="text-muted font-14">Founder</p>

                                <button type="button" className="btn btn-success btn-sm mb-2">Follow</button>
                                <button type="button" className="btn btn-danger btn-sm mb-2">Message</button>

                                <div className="text-start mt-3">
                                    <h4 className="font-13 text-uppercase">About Me:</h4>
                                    <p className="text-muted font-13 mb-3">
                                        Hi, I am Johnathn Deo, has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                                    </p>
                                    <p className="text-muted mb-2 font-13">
                                        <strong>Full Name:</strong>
                                        <span className="ms-2">Geneva D. McKnight</span>
                                    </p>

                                    <p className="text-muted mb-2 font-13">
                                        <strong>Mobile:</strong>
                                        <span className="ms-2">(123) 123 1234</span>
                                    </p>

                                    <p className="text-muted mb-2 font-13">
                                        <strong>Email:</strong>
                                        <span className="ms-2">user@email.domain</span>
                                    </p>

                                    <p className="text-muted mb-1 font-13">
                                        <strong>Location:</strong>
                                        <span className="ms-2">USA</span>
                                    </p>
                                </div>

                                <ul className="social-list list-inline mt-3 mb-0">
                                    <li className="list-inline-item">
                                        <a href="#" className="social-list-item border-primary text-primary">
                                            <i className="mdi mdi-facebook"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="social-list-item border-danger text-danger">
                                            <i className="mdi mdi-google"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="social-list-item border-info text-info">
                                            <i className="mdi mdi-twitter"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="social-list-item border-secondary text-secondary">
                                            <i className="mdi mdi-github"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>  {/* end card-body */}
                        </div>  {/* end card */}

                        {/* Messages */}
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h4 className="header-title">Messages</h4>
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            {/* item */}
                                            <a href="#" className="dropdown-item">Settings</a>
                                            {/* item */}
                                            <a href="#" className="dropdown-item">Action</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="inbox-widget">
                                    <div className="inbox-item">
                                        <div className="inbox-item-img">
                                            <img src="assets/images/users/avatar-2.jpg" className="rounded-circle" alt="avatar-2" />
                                        </div>
                                        <p className="inbox-item-author">Tomaslau</p>
                                        <p className="inbox-item-text">I have finished it! See you so...</p>
                                        <p className="inbox-item-date">
                                            <a href="#" className="btn btn-sm btn-link text-info font-13">Reply</a>
                                        </p>
                                    </div>
                                    <div className="inbox-item">
                                        <div className="inbox-item-img">
                                            <img src="assets/images/users/avatar-3.jpg" className="rounded-circle" alt="avatar-3" />
                                        </div>
                                        <p className="inbox-item-author">Stillnotdavid</p>
                                        <p className="inbox-item-text">This theme is awesome!</p>
                                        <p className="inbox-item-date">
                                            <a href="#" className="btn btn-sm btn-link text-info font-13">Reply</a>
                                        </p>
                                    </div>
                                    <div className="inbox-item">
                                        <div className="inbox-item-img">
                                            <img src="assets/images/users/avatar-4.jpg" className="rounded-circle" alt="avatar-4" />
                                        </div>
                                        <p className="inbox-item-author">Kurafire</p>
                                        <p className="inbox-item-text">Nice to meet you</p>
                                        <p className="inbox-item-date">
                                            <a href="#" className="btn btn-sm btn-link text-info font-13">Reply</a>
                                        </p>
                                    </div>
                                    <div className="inbox-item">
                                        <div className="inbox-item-img">
                                            <img src="assets/images/users/avatar-5.jpg" className="rounded-circle" alt="avatar-5" />
                                        </div>
                                        <p className="inbox-item-author">Shahedk</p>
                                        <p className="inbox-item-text">Hey! there I am available...</p>
                                        <p className="inbox-item-date">
                                            <a href="#" className="btn btn-sm btn-link text-info font-13">Reply</a>
                                        </p>
                                    </div>
                                    <div className="inbox-item">
                                        <div className="inbox-item-img">
                                            <img src="assets/images/users/avatar-6.jpg" className="rounded-circle" alt="avatar-6" />
                                        </div>
                                        <p className="inbox-item-author">Adhamdannaway</p>
                                        <p className="inbox-item-text">This theme is awesome!</p>
                                        <p className="inbox-item-date">
                                            <a href="#" className="btn btn-sm btn-link text-info font-13">Reply</a>
                                        </p>
                                    </div>
                                </div>  {/* End inbox-widget */}
                            </div>  {/* End card-body */}
                        </div>  {/* End card */}





                        
                    </div>

                    <div className="col-xl-8 col-lg-7">
                                <div className="card">
                                    <div className="card-body">
                                        <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                            <li className="nav-item">
                                                <a href="#aboutme" data-bs-toggle="tab" aria-expanded="false" className="nav-link rounded-0">
                                                    About
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#timeline" data-bs-toggle="tab" aria-expanded="true" className="nav-link rounded-0 active">
                                                    Timeline
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#settings" data-bs-toggle="tab" aria-expanded="false" className="nav-link rounded-0">
                                                    Settings
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane" id="aboutme">
    
                                                <h5 className="text-uppercase"><i className="mdi mdi-briefcase me-1"></i>
                                                    Experience</h5>

                                                <div className="timeline-alt pb-0">
                                                    <div className="timeline-item">
                                                        <i className="mdi mdi-circle bg-info-lighten text-info timeline-icon"></i>
                                                        <div className="timeline-item-info">
                                                            <h5 className="mt-0 mb-1">Lead designer / Developer</h5>
                                                            <p className="font-14">websitename.com <span className="ms-2 font-12">Year: 2015 - 18</span></p>
                                                            <p className="text-muted mt-2 mb-0 pb-3">Everyone realizes why a new common language
                                                                would be desirable: one could refuse to pay expensive translators.
                                                                To achieve this, it would be necessary to have unihtmlForm grammar,
                                                                pronunciation and more common words.</p>
                                                        </div>
                                                    </div>
    
                                                    <div className="timeline-item">
                                                        <i className="mdi mdi-circle bg-primary-lighten text-primary timeline-icon"></i>
                                                        <div className="timeline-item-info">
                                                            <h5 className="mt-0 mb-1">Senior Graphic Designer</h5>
                                                            <p className="font-14">Software Inc. <span className="ms-2 font-12">Year: 2012 - 15</span></p>
                                                            <p className="text-muted mt-2 mb-0 pb-3">If several languages coalesce, the grammar
                                                                of the resulting language is more simple and regular than that of
                                                                the individual languages. The new common language will be more
                                                                simple and regular than the existing European languages.</p>

                                                        </div>
                                                    </div>
    
                                                    <div className="timeline-item">
                                                        <i className="mdi mdi-circle bg-info-lighten text-info timeline-icon"></i>
                                                        <div className="timeline-item-info">
                                                            <h5 className="mt-0 mb-1">Graphic Designer</h5>
                                                            <p className="font-14">Coderthemes Design LLP <span className="ms-2 font-12">Year: 2010 - 12</span></p>
                                                            <p className="text-muted mt-2 mb-0 pb-2">The European languages are members of
                                                                the same family. Their separate existence is a myth. htmlFor science
                                                                music sport etc, Europe uses the same vocabulary. The languages
                                                                only differ in their grammar their pronunciation.</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                {/* end timeline */}        

                                                <h5 className="mb-3 mt-4 text-uppercase"><i className="mdi mdi-cards-variant me-1"></i>
                                                    Projects</h5>
                                                <div className="table-responsive">
                                                    <table className="table table-borderless table-nowrap mb-0">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Clients</th>
                                                                <th>Project Name</th>
                                                                <th>Start Date</th>
                                                                <th>Due Date</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td><img src="assets/images/users/avatar-2.jpg" alt="table-user" className="me-2 rounded-circle" height="24"></img> Halette Boivin</td>
                                                                <td>App design and development</td>
                                                                <td>01/01/2015</td>
                                                                <td>10/15/2018</td>
                                                                <td><span className="badge badge-info-lighten">Work in Progress</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td><img src="assets/images/users/avatar-3.jpg" alt="table-user" className="me-2 rounded-circle" height="24"></img> Durandana Jolicoeur</td>
                                                                <td>Coffee detail page - Main Page</td>
                                                                <td>21/07/2016</td>
                                                                <td>12/05/2018</td>
                                                                <td><span className="badge badge-danger-lighten">Pending</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td><img src="assets/images/users/avatar-4.jpg" alt="table-user" className="me-2 rounded-circle" height="24"></img> Lucas Sabourin</td>
                                                                <td>Poster illustation design</td>
                                                                <td>18/03/2018</td>
                                                                <td>28/09/2018</td>
                                                                <td><span className="badge badge-success-lighten">Done</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td><img src="assets/images/users/avatar-6.jpg" alt="table-user" className="me-2 rounded-circle" height="24"></img> Donatien Brunelle</td>
                                                                <td>Drinking bottle graphics</td>
                                                                <td>02/10/2017</td>
                                                                <td>07/05/2018</td>
                                                                <td><span className="badge badge-info-lighten">Work in Progress</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>5</td>
                                                                <td><img src="assets/images/users/avatar-5.jpg" alt="table-user" className="me-2 rounded-circle" height="24"></img> Karel Auberjo</td>
                                                                <td>Landing page design - Home</td>
                                                                <td>17/01/2017</td>
                                                                <td>25/05/2021</td>
                                                                <td><span className="badge badge-warning-lighten">Coming soon</span></td>
                                                            </tr>
    
                                                        </tbody>
                                                    </table>
                                                </div>
    
                                            </div> {/* end tab-pane */}
                                            {/* end about me section content */}
    
                                            <div className="tab-pane show active" id="timeline">
    
                                                {/* comment box */}
                                                <div className="border rounded mt-2 mb-3">
                                                    <htmlForm action="#" className="comment-area-box">
                                                        <textarea rows="3" className="htmlForm-control border-0 resize-none" placeholder="Write something...."></textarea>
                                                        <div className="p-2 bg-light d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <a href="#" className="btn btn-sm px-2 font-16 btn-light"><i className="mdi mdi-account-circle"></i></a>
                                                                <a href="#" className="btn btn-sm px-2 font-16 btn-light"><i className="mdi mdi-map-marker"></i></a>
                                                                <a href="#" className="btn btn-sm px-2 font-16 btn-light"><i className="mdi mdi-camera"></i></a>
                                                                <a href="#" className="btn btn-sm px-2 font-16 btn-light"><i className="mdi mdi-emoticon-outline"></i></a>
                                                            </div>
                                                            <button type="submit" className="btn btn-sm btn-dark waves-effect">Post</button>
                                                        </div>
                                                    </htmlForm>
                                                </div> {/* end .border*/}
                                                {/* end comment box */}
    
                                                {/* Story Box*/}
                                                <div className="border border-light rounded p-2 mb-3">
                                                    <div className="d-flex">
                                                        <img className="me-2 rounded-circle" src="assets/images/users/avatar-3.jpg"
                                                            alt="Generic placeholder image" height="32"></img>
                                                        <div>
                                                            <h5 className="m-0">Jeremy Tomlinson</h5>
                                                            <p className="text-muted"><small>about 2 minuts ago</small></p>
                                                        </div>
                                                    </div>
                                                    <p>Story based around the idea of time lapse, animation to post soon!</p>
    
                                                    <img src="assets/images/small/small-1.jpg" alt="post-img" className="rounded me-1"
                                                        height="60" />
                                                    <img src="assets/images/small/small-2.jpg" alt="post-img" className="rounded me-1"
                                                        height="60" />
                                                    <img src="assets/images/small/small-3.jpg" alt="post-img" className="rounded"
                                                        height="60" />
    
                                                    <div className="mt-2">
                                                        <a href="javascript: void(0);" className="btn btn-sm btn-link text-muted"><i
                                                                className="mdi mdi-reply"></i> Reply</a>
                                                        <a href="javascript: void(0);" className="btn btn-sm btn-link text-muted"><i
                                                                className="mdi mdi-heart-outline"></i> Like</a>
                                                        <a href="javascript: void(0);" className="btn btn-sm btn-link text-muted"><i
                                                                className="mdi mdi-share-variant"></i> Share</a>
                                                    </div>
                                                </div>
    
                                                {/* Story Box*/}
                                                <div className="border border-light rounded p-2 mb-3">
                                                    <div className="d-flex">
                                                        <img className="me-2 rounded-circle" src="assets/images/users/avatar-4.jpg"
                                                            alt="Generic placeholder image" height="32"></img>
                                                        <div>
                                                            <h5 className="m-0">Thelma Fridley</h5>
                                                            <p className="text-muted"><small>about 1 hour ago</small></p>
                                                        </div>
                                                    </div>
                                                    <div className="font-16 text-center fst-italic text-dark">
                                                        <i className="mdi mdi-htmlFormat-quote-open font-20"></i> Cras sit amet nibh libero, in
                                                        gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras
                                                        purus odio, vestibulum in vulputate at, tempus viverra turpis. Duis
                                                        sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
                                                        porta. Mauris massa.
                                                    </div>
    
                                                    <div className="mx-n2 p-2 mt-3 bg-light">
                                                        <div className="d-flex">
                                                            <img className="me-2 rounded-circle" src="assets/images/users/avatar-3.jpg"
                                                                alt="Generic placeholder image" height="32"></img>
                                                            <div>
                                                                <h5 className="mt-0">Jeremy Tomlinson <small className="text-muted">3 hours ago</small></h5>
                                                                Nice work, makes me think of The Money Pit.
    
                                                                <br/>
                                                                <a href="javascript: void(0);" className="text-muted font-13 d-inline-block mt-2"><i
                                                                    className="mdi mdi-reply"></i> Reply</a>
    
                                                                <div className="d-flex mt-3">
                                                                    <a className="pe-2" href="#">
                                                                        <img src="assets/images/users/avatar-4.jpg" className="rounded-circle"
                                                                            alt="Generic placeholder image" height="32"></img>
                                                                    </a>
                                                                    <div>
                                                                        <h5 className="mt-0">Thelma Fridley <small className="text-muted">5 hours ago</small></h5>
                                                                        i am in the middle of a timelapse animation myself! (Very different though.) Awesome stuff.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
    
                                                        <div className="d-flex mt-2">
                                                            <a className="pe-2" href="#">
                                                                <img src="assets/images/users/avatar-1.jpg" className="rounded-circle"
                                                                    alt="Generic placeholder image" height="32"></img>
                                                            </a>
                                                            <div className="w-100">
                                                                <input type="text" id="simpleinput" className="htmlForm-control border-0 htmlForm-control-sm" placeholder="Add comment"></input>
                                                            </div>
                                                        </div>
                                                    </div>
    
                                                    <div className="mt-2">
                                                        <a href="javascript: void(0);" className="btn btn-sm btn-link text-danger"><i
                                                                className="mdi mdi-heart"></i> Like (28)</a>
                                                        <a href="javascript: void(0);" className="btn btn-sm btn-link text-muted"><i
                                                                className="mdi mdi-share-variant"></i> Share</a>
                                                    </div>
                                                </div>
    
                                                {/* Story Box*/}
                                                <div className="border border-light p-2 mb-3">
                                                    <div className="d-flex">
                                                        <img className="me-2 rounded-circle" src="assets/images/users/avatar-6.jpg"
                                                            alt="Generic placeholder image" height="32"></img>
                                                        <div>
                                                            <h5 className="m-0">Martin Williamson</h5>
                                                            <p className="text-muted"><small>15 hours ago</small></p>
                                                        </div>
                                                    </div>
                                                    <p>The parallax is a little odd but O.o that house build is awesome!!</p>
    
                                                    <iframe src='https://player.vimeo.com/video/87993762' height='300' className="img-fluid border-0"></iframe>
                                                </div>
    
                                                <div className="text-center">
                                                    <a href="javascript:void(0);" className="text-danger"><i className="mdi mdi-spin mdi-loading me-1"></i> Load more </a>
                                                </div>
    
                                            </div>
                                            {/* end timeline content*/}
    
                                            <div className="tab-pane" id="settings">
                                                <htmlForm>
                                                    <h5 className="mb-4 text-uppercase"><i className="mdi mdi-account-circle me-1"></i> Personal Info</h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="firstname" className="htmlForm-label">First Name</label>
                                                                <input type="text" className="htmlForm-control" id="firstname" placeholder="Enter first name"></input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="lastname" className="htmlForm-label">Last Name</label>
                                                                <input type="text" className="htmlForm-control" id="lastname" placeholder="Enter last name"></input>
                                                            </div>
                                                        </div> {/* end col */}
                                                    </div> {/* end row */}
    
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="mb-3">
                                                                <label htmlFor="userbio" className="htmlForm-label">Bio</label>
                                                                <textarea className="htmlForm-control" id="userbio" rows="4" placeholder="Write something..."></textarea>
                                                            </div>
                                                        </div> {/* end col */}
                                                    </div> {/* end row */}
    
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="useremail" className="htmlForm-label">Email Address</label>
                                                                <input type="email" className="htmlForm-control" id="useremail" placeholder="Enter email"></input>
                                                                <span className="htmlForm-text text-muted"><small>If you want to change email please <a href="javascript: void(0);">click</a> here.</small></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="userpassword" className="htmlForm-label">Password</label>
                                                                <input type="password" className="htmlForm-control" id="userpassword" placeholder="Enter password"></input>
                                                                <span className="htmlForm-text text-muted"><small>If you want to change password please <a href="javascript: void(0);">click</a> here.</small></span>
                                                            </div>
                                                        </div> {/* end col */}
                                                    </div> {/* end row */}
    
                                                    <h5 className="mb-3 text-uppercase bg-light p-2"><i className="mdi mdi-office-building me-1"></i> Company Info</h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="companyname" className="htmlForm-label">Company Name</label>
                                                                <input type="text" className="htmlForm-control" id="companyname" placeholder="Enter company name"></input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="cwebsite" className="htmlForm-label">Website</label>
                                                                <input type="text" className="htmlForm-control" id="cwebsite" placeholder="Enter website url"></input>
                                                            </div>
                                                        </div> {/* end col */}
                                                    </div> {/* end row */}
    
                                                    <h5 className="mb-3 text-uppercase bg-light p-2"><i className="mdi mdi-earth me-1"></i> Social</h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="social-fb" className="htmlForm-label">Facebook</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text"><i className="mdi mdi-facebook"></i></span>
                                                                    <input type="text" className="htmlForm-control" id="social-fb" placeholder="Url"></input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="social-tw" className="htmlForm-label">Twitter</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text"><i className="mdi mdi-twitter"></i></span>
                                                                    <input type="text" className="htmlForm-control" id="social-tw" placeholder="Username"></input>
                                                                </div>
                                                            </div>
                                                        </div> {/* end col */}
                                                    </div> {/* end row */}
    
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="social-insta" className="htmlForm-label">Instagram</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text"><i className="mdi mdi-instagram"></i></span>
                                                                    <input type="text" className="htmlForm-control" id="social-insta" placeholder="Url"></input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="social-lin" className="htmlForm-label">Linkedin</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text"><i className="mdi mdi-linkedin"></i></span>
                                                                    <input type="text" className="htmlForm-control" id="social-lin" placeholder="Url"></input>
                                                                </div>
                                                            </div>
                                                        </div> {/* end col */}
                                                    </div> {/* end row */}
    
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="social-sky" className="htmlForm-label">Skype</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text"><i className="mdi mdi-skype"></i></span>
                                                                    <input type="text" className="htmlForm-control" id="social-sky" placeholder="@username"></input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="social-gh" className="htmlForm-label">Github</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text"><i className="mdi mdi-github"></i></span>
                                                                    <input type="text" className="htmlForm-control" id="social-gh" placeholder="Username"></input>
                                                                </div>
                                                            </div>
                                                        </div> {/* end col */}
                                                    </div> {/* end row */}
                                                    
                                                    <div className="text-end">
                                                        <button type="submit" className="btn btn-success mt-2"><i className="mdi mdi-content-save"></i> Save</button>
                                                    </div>
                                                </htmlForm>
                                            </div>
                                            {/* end settings content*/}
    
                                        </div> {/* end tab-content */}
                                    </div> {/* end card body */}
                                </div> {/* end card */}
                            </div>
                </div>
                {/* End row */}
            </div>
            {/* End container */}

            {/* Footer */}
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            © <script>document.write(new Date().getFullYear())</script> Hyper - Coderthemes.com
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-end footer-links d-none d-md-block">
                                <a href="#">About</a>
                                <a href="#">Support</a>
                                <a href="#">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}


export default Profile;
