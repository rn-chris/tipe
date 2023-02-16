<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Booking_Model extends CI_Model {

    private $website = 'website';
	
	function get_trip_list($start, $end, $c) {
        
        $this->db->where('trip_date', $start);
        $this->db->where('trip_to', $end);
        $query = $this->db->get('trip')->result();
        $i = 0;
        foreach ($query as $row) {
            if($c == "start"){
                $query[$i]->trip_required = $this->db->where('trip_id_depart', $row->trip_id)->get('ticket')->num_rows();
            }
            else if($c == "end"){
                $query[$i]->trip_required = $this->db->where('trip_id_return', $row->trip_id)->get('ticket')->num_rows();
            }
            $d = $row->trip_date." ".$row->trip_time;
            $today = date('Y-m-d H:i:s');
            $date1 = strtotime($today);  
            $date2 = strtotime($d);  
            $query[$i]->befor_trip_date = $date2 - $date1;  
            $i++;
        }
        if ($query) {
            return $query;
        }
        return NULL;
    }
    function cancel_pending_trip($order_id) {
        $this->db->where('order_id', $order_id)->delete('ticket');
        $this->db->where('order_id', $order_id)->delete('orders');
        return true;
    }
    function tikcet_order_save($order_data, $ticket_data, $adult, $child) {
        
        $this->db->insert('orders', $order_data);
        $order_id = $this->db->insert_id();
        $ticket_data['order_id'] = $order_id;
        for ($i = 0; $i < $adult; $i++) {
            $ticket_data['ticket_type'] = 'adult';
            $this->db->insert('ticket', $ticket_data);
        }
        for ($i = 0; $i < $child; $i++) {
            $ticket_data['ticket_type'] = 'child';
            $this->db->insert('ticket', $ticket_data);
        }
        $result['id'] = $order_id;
        $result['state'] = true;
        return $result;
    }
     function order_ticket_update($id, $data) {
        $this->db->where('order_id', $id);
        if($this->db->update('orders', $data)){
            return true;
        }
        else {
            return false;
        }
     }
    

}