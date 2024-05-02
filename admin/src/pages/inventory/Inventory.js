import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Divider, Table } from 'antd';
import './Inventory.css'
import Link from 'antd/es/typography/Link';



function Inventory() {

    const addProduct = () => {
        window.location.href = '/inventory/ProductForm';
      };
      
  const columns = [
    {
      title: 'Inventory ID',
      dataIndex: 'inventory_id',
    },
    
    {
      title: 'Product Name',
      dataIndex: 'product_name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
      },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },

    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
        title: 'Weight',
        dataIndex: 'weight',
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
      },
      
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <button className='edt_btn'>Edit</button>,
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <button className='delete_btn'>Delete</button>,
    },

  ];
  const data = [
    {
      key: '1',
      inventory_id: 1,
      product_name:  'Kumarika',
      description:'kumarika',
      category:'hair',
      brand:'kumarika',
      quantity:'100',
      weight:'100',
      price:'1200',
      discount:'0',
    },
     
  ];


  return (
    <div className='content'> <h2>Manage Inventory</h2>
      <input className='search'
        type="search"
        placeholder="Search here" />
      <Divider>Inventory Details</Divider>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div>
        <Link to="/inventory/ProductForm">
            <button className='add_cus_btn' onClick={(addProduct )}>Add Product</button>
        </Link>
      </div>
    </div>

  );
}

export default Inventory;