<?php

defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	exit;
}

// required for REST API
require(APPPATH . '/libraries/REST_Controller.php');
require APPPATH . 'libraries/Format.php';
use Restserver\Libraries\REST_Controller;

class WebsiteRestController extends REST_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('Booking_Model', 'wm');
    }
	
	function trip_get_post() {
        $date = $this->post('date');
        $place = $this->post('place');
        $method = $this->post('method');
        $websites = $this->wm->get_trip_list($date, $place, $method);
        if ($websites) {
            $this->response($websites, 200);
        } else {
            $this->response(array(), 200);
        }
    }
    function trip_pending_cancel_post(){
        $order_id=$this->post('order_id');
        $result = $this->wm->cancel_pending_trip($order_id);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success', 'order_id' => $order_id));
        }
    }
    function ticket_order_post() {
        $start = $this->post('trip_id_depart');
        $end = $this->post('trip_id_return');

        $oder_data = array('trip_id_depart' => $this->post('trip_id_depart'),
                        'trip_id_return' => $this->post('trip_id_return'),
                        'order_amount' => $this->post('order_amount'),
                        'order_datetime' => date('Y-m-d H:i:s'),
                        'agent_id' => 0,
                        'agent_sub_id' => 0,
                        'order_ip' => $_SERVER['REMOTE_ADDR']
                    );
        $adult = $this->post('adult');
        $child = $this->post('child');
        $num = (int)$adult + (int)$child;
        // $this->response(array('status' => 'success','id' => $oder_data));
        $ticket_data = array('trip_id_depart' => $this->post('trip_id_depart'),
                        'trip_id_return' => $this->post('trip_id_return'),
                        'ticket_purchase_datetime' => date('Y-m-d H:i:s'),
                        'ticket_destination' => $this->post('jetty')
                    );
        // $this->response(array('status' => 'success','id' => $ticket_data));
        $result = $this->wm->tikcet_order_save($oder_data, $ticket_data, $adult, $child);

        if ($result['state'] === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success','id' => $result['id']));
        }
    }
    function tikcet_order_update_post() {
        $order_id = $this->post('order_id');
        $order_data = array(
                        'order_name' => $this->post('user_name'),
                        'order_email' => $this->post('user_email'),
                        'order_phone' => $this->post('user_phone'),
                        'order_datetime' => date('Y-m-d H:i:s'),
                        'order_ip' => $_SERVER['REMOTE_ADDR']
                    );
        $result = $this->wm->order_ticket_update($order_id, $order_data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
	
	
}