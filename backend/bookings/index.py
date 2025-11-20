import json
import os
from datetime import datetime, date
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Saves client booking requests to database
    Args: event with httpMethod, body (client data)
          context with request_id
    Returns: HTTP response with booking confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        client_name = body_data.get('clientName', '')
        client_phone = body_data.get('clientPhone', '')
        client_email = body_data.get('clientEmail', '')
        service = body_data.get('service', '')
        master = body_data.get('master', '')
        booking_date = body_data.get('date', '')
        booking_time = body_data.get('time', '')
        
        if not all([client_name, client_phone, service, master, booking_date, booking_time]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        database_url = os.environ.get('DATABASE_URL')
        
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute(
            "INSERT INTO bookings (client_name, client_phone, client_email, service, master, booking_date, booking_time, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (client_name, client_phone, client_email, service, master, booking_date, booking_time, 'new')
        )
        
        booking_id = cursor.fetchone()['id']
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'bookingId': booking_id,
                'message': 'Запись успешно создана!'
            }),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        database_url = os.environ.get('DATABASE_URL')
        
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute(
            "SELECT id, client_name, client_phone, service, master, booking_date, booking_time, status, created_at FROM bookings ORDER BY booking_date DESC, booking_time DESC LIMIT 100"
        )
        
        bookings = cursor.fetchall()
        
        bookings_list = []
        for booking in bookings:
            booking_dict = dict(booking)
            if isinstance(booking_dict.get('booking_date'), (datetime, date)):
                booking_dict['booking_date'] = booking_dict['booking_date'].isoformat()
            if isinstance(booking_dict.get('created_at'), datetime):
                booking_dict['created_at'] = booking_dict['created_at'].isoformat()
            bookings_list.append(booking_dict)
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'bookings': bookings_list}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }