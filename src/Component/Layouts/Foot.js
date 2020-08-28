import React from 'react'
import  './footer.css';

export default function Footer() {
    return (
		<div id="foot">
			<div className="row text-center text-xs-center text-sm-left text-md-left">
				<div className="col-xs-12 col-sm-4 col-md-4">
					<p>Foodista</p>
					<p>Contact@foodista.com</p>
					<p>014782806</p>
					<p>New Baneshwor, KTM</p>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-4">
					<ul className="list-unstyled quick-links">
						<li><i className="fa fa-angle-double-right"></i>About Food</li>
						<li><i className="fa fa-angle-double-right"></i>Blog</li>
						<li><i className="fa fa-angle-double-right"></i>Contact</li>
						<li><i className="fa fa-angle-double-right"></i>Add Resturant</li>
					</ul>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-4">
					<ul className="list-unstyled quick-links">
						<li><i className="fa fa-angle-double-right"></i>FAQ</li>
						<li><i className="fa fa-angle-double-right"></i>Tutorial</li>
						<li><i className="fa fa-angle-double-right"></i>Address</li>
						<li><i className="fa fa-angle-double-right"></i>Query</li>
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
					<ul className="list-unstyled list-inline social text-center">
						<li className="list-inline-item"><i className="fa fa-facebook"></i></li>
						<li className="list-inline-item"><i className="fa fa-twitter"></i></li>
						<li className="list-inline-item"><i className="fa fa-instagram"></i></li>
						<li className="list-inline-item"><i className="fa fa-google-plus"></i></li>
						<li className="list-inline-item"><i className="fa fa-envelope"></i></li>
					</ul>
				</div>
			</div>	
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
					<p className="h6">&copy; All right Reversed.</p>
				</div>
        	</div>
        </div>
    )
}

