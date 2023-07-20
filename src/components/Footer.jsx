import React from 'react';
import { Col, Row, Section } from 'react-materialize';
import { NavLink } from 'react-router-dom';

export default function Footer() {

    return (
        <Section style={{ background: '#404258', textAlign: 'center' }}>
            <div>
                <h4 className='title-footer white-text'>Experience the tranquility of Yoga and find your inner balance.</h4>
            </div>
            <hr />
            <div>
                <Row>
                    <Col m={3}>
                        <h5 className='head-item-footer'>About Us</h5>
                        <NavLink to='#'>
                            Founder
                        </NavLink>
                        <br />
                        <NavLink to='#'>
                            CO-Founder
                        </NavLink>
                        <br />
                        <NavLink to='#'>
                            CEO
                        </NavLink>
                    </Col>
                    <Col m={3}>
                        <h5 className='head-item-footer'>Services</h5>
                        <NavLink to='#'>
                            Personal Trainer
                        </NavLink>
                        <br />
                        <NavLink to='#'>
                            Yoga
                        </NavLink>
                        <br />
                        <NavLink to='#'>
                            Muscle relaxants
                        </NavLink>
                    </Col>
                    <Col m={3}>
                        <h5 className='head-item-footer'>Contact Us</h5>
                        <NavLink to='#'>
                            Send Feedback
                        </NavLink>
                        <br />
                        <NavLink to='#'>
                            Phone: 0393215170
                        </NavLink>
                        <br />
                        <NavLink to='#'>
                            Email: admin@gmail.com
                        </NavLink>
                    </Col>
                    <Col m={3}>
                        <h5 className='head-item-footer'> Social Media</h5>
                        <NavLink to='#'>
                            FaceBook
                        </NavLink>
                        <br />
                        <NavLink to='#'>
                            Instagram
                        </NavLink>
                        <br />
                        <NavLink to='#'>
                            Twitter
                        </NavLink>
                    </Col>
                </Row>
            </div>
        </Section>
    );
}