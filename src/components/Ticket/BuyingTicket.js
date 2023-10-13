import React, { useContext } from "react";
import { Button, FormLabel, Table, Alert } from "react-bootstrap";
import { FaCalendarDay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HeaderCart from "./HeaderCart";
import "./BuyingTicket.css"
import { TicketContext } from "./TicketContext/TicketContext";

const BuyingTicket = () => {
    const context = useContext(TicketContext)
    
    const NavigationButtons = ({ onOkClick, onAddClick }) => {
        return (
            <div className="button-direct">
                <Button className="button-left" onClick={onOkClick} disabled={context.ticket1.count ===0 && context.ticket2.count ===0 && context.ticket3.count ===0}>
                    Xac nhan
                </Button>
                
                    <Button to className="button-right" onClick={onAddClick} disabled={context.ticket1.count ===0 && context.ticket2.count ===0 && context.ticket3.count ===0}>
                        <Link className="link-underline-hover" style={{color: 'white', textDecoration: 'none'}} to='/viewcart'>Add to cart {' '}</Link>
                    </Button>
            </div>
        );
    };
    const handleOkClick = () => {
        // Implement your logic for going back
        context.setPrice({ count: context.ticket1.count * 2 + context.ticket2.count * 1.4 })
        context.setAmount({ count: context.ticket1.count + context.ticket2.count + context.ticket3.count })
        console.log(context);
    };

    const handleAddClick = () => {
        // Implement your logic for going next
        console.log('Add button clicked');
    };
    
    return (
        <>
            <div className="min-vh-100">
                <HeaderCart />
                <div className="zoo-information">
                    <h4 className="ms-5">Zoo Day Ticket</h4>
                    <div className="box-alert">
                        <Alert className="mx-auto" style={{ width: '90rem' }} variant="success">
                            <Alert.Heading><h3>TIP-CHEAPEST AND QUICKEST TICKET ONLY ONLINE!</h3></Alert.Heading>
                            <p>Online tickets cheaper than at ticket booths on site</p>
                            <p>Skip the queue with online tickets and go straight to ticket checkers</p>
                            <p>Easy online booking without user account</p>
                        </Alert>
                    </div>
                    <div className="ticket-table mx-auto">

                        <Table className="table" bordered variant="none">
                            <thead>
                                <th className="ticket-table-information" colSpan={4}>PLEASE SELECT YOUR ITEM</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="text-align">Please select a day</th>
                                    <th colSpan={2}><FaCalendarDay /></th>
                                    <th>Cost</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th className="text-align">Day Ticket Zoo - Adult</th>
                                    <th class="align-self-center" colSpan={2}>

                                        <Button variant="outline-dark" onClick={context.decrease1}>-</Button> {' '}
                                        <FormLabel type='text'>{' '}{context.ticket1.count}{' '}</FormLabel>{' '}
                                        <Button variant="outline-dark" onClick={() => context.setTicket1({ count: context.ticket1.count + 1 })}>+</Button>

                                    </th>
                                    <th>2$</th>
                                </tr>
                                <tr>
                                    <th className="text-align">Day Ticket Zoo - Children<p>aged under 18</p></th>
                                    <th class="align-self-center" colSpan={2}>

                                        <Button variant="outline-dark" onClick={context.decrease2}>-</Button> {' '}
                                        <FormLabel type='text'>{' '}{context.ticket2.count}{' '}</FormLabel>{' '}
                                        <Button variant="outline-dark" onClick={() => context.setTicket2({ count: context.ticket2.count + 1 })}>+</Button>

                                    </th>
                                    <th>1.4$</th>
                                </tr>
                                <tr>
                                    <th className="text-align">Day Ticket Zoo - Children<p>lower than 1m3</p></th>
                                    <th class="align-self-center" colSpan={2}>

                                        <Button variant="outline-dark" onClick={context.decrease3}>-</Button> {' '}
                                        <FormLabel type='text'>{' '}{context.ticket3.count}{' '}</FormLabel>{' '}
                                        <Button variant="outline-dark" onClick={() => context.setTicket3({ count: context.ticket3.count + 1 })}>+</Button>

                                    </th>
                                    <th>Free</th>
                                </tr>
                                <tr>
                                    <th className="text-align">Total</th>
                                    <th colSpan={2}>
                                        <FormLabel type='text'>{context.amount.count}</FormLabel>
                                    </th>
                                    <th>
                                        <FormLabel type='text'>{context.price.count}</FormLabel>
                                    </th>
                                </tr>
                            </tbody>

                        </Table>
                        <NavigationButtons onOkClick={handleOkClick} onAddClick={handleAddClick} />
                        <div className="note fs-3">
                            <p style={{ fontFamily: 'Just Another Hand' }}>Please note!</p>

                            <p>After purchase you will receive your tickets by e-mail (can be presented digitally). The tickets are only valid on the selected date. Booked tickets are excluded from cancellation and/or exchange.</p>

                            <p>Please find further information on the conservation contribution here. The contribution is optional and can be deselected in the cart.</p>

                            <p>Children under 12 years of age and any visitors who lack the necessary maturity or require permanent supervision due to a mental and/or physical condition must be accompanied and supervised on the premises at all times by an adult chaperone</p>

                            <p>* Only valid in combination with a corresponding proof. The proof must be personalized, given a (valid) validity and issued by an official authority/institution (not digital). The proof will be checked at the admission checkers - please have it ready along with a photo ID.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default BuyingTicket;