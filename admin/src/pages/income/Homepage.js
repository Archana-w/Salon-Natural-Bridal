import React, { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import { Form, Input, Table, DatePicker } from "antd";
import Layout from "./../../components/income/Layout/Layout";
import axios from "axios";
import { message } from "antd";
import Spinner from "../../components/income/Spinner";
import moment from "moment";
import Analytics from "../../components/income/Analytics"; 
import { UnorderedListOutlined, AreaChartOutlined , EditOutlined, DeleteOutlined } from "@ant-design/icons";
import generateTransactionReport from "./reportGenerator"
import './income.css'

import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";


const { RangePicker } = DatePicker;

const IncomeHomepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState("30");
  // Too hold the values commig from server
  const [allTransection, setAllTransection] = useState([]);
  const [allTransectionAnalize, setAllTransectionAnalize] = useState([]);
  const [filterdTransection, setFilterdTransection] = useState([]);
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  // graph state define here
  const [viewData,setViewData] = useState('table');
  // handing the edit and delte data 
  const [editable,setEditable] = useState(null)

  const [addForm] = Form.useForm();


  var token = useAuthToken();
  var navigate = useNavigate();

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render : (text , record) => (
        
        <div>
          {record.isAuto ==1 ? (
            <span class="text-danger" >Disabled</span>
          ) : (
            <>
              <EditOutlined onClick={() => {
                setShowModal(true);
                setEditable(record);
                setTimeout(() => {
                  addForm.resetFields();
                }, 50);
                
              }} className="btn btn-warning"/>
              &nbsp;
              <DeleteOutlined className="btn btn-danger" onClick={() => {handleDelete(record)}} />
            </>
          )}
        </div>
      )
    },
  ];

  // getall transactions
  const getAllTransaction = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/transections/get-transection", {
        token,
        frequency,
        selectedDate,
        type,
      });
 
      if (res.status == 200) {
        let data = res.data;
        if(!Array.isArray(data) && (typeof data)=='object' && data.hasOwnProperty('status') && (data.status == "token_expired" || data.status == "auth_failed")){
          navigate("/signout");
        }else{
          setLoading(false);
          setAllTransection(data);
          setFilterdTransection(data);
          setAllTransectionAnalize(JSON.parse(JSON.stringify(data)));
          setEditable(null); 
          console.log(res.data);
        }
      }else {
        var message = getErrorMessage(res.data);
        alert("Error - " + message);
        console.error(res);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect Hook
  useEffect(() => {
    if (token == null) {
      navigate("/signout");
    }
    
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  const getErrorMessage = (data)=>{
    try{
      return ((typeof data)=='object')?JSON.stringify(data):data;
    }catch(e){
      console.error(e);
      return data;
    }
  }


  //delete  handler 

  const handleDelete = async(record) => {

    try {
      
      
      setLoading(true)
      let res = await axios.post("http://localhost:5000/transections/delete-transection",{token,transacationId:record._id})
      if(res.status==200){
        message.success('Transaction Deleted Successfully');  
      }else{
        message.error('unable to delete')
      }
      setLoading(false) 
    } catch (error) {
      setLoading(false)
      console.log(error)
      message.error('unable to delete')
      
      
    }
    getAllTransaction();

  }


  //search handler

  const doSearch = (event) => {
    let key = event.target.value;
    if(key== undefined || key== "" || key==null){
      setFilterdTransection(allTransection)
    }else{
      key = (key+"").toUpperCase();
      let filterdata = allTransection.filter(x=>{
        let index = Object.keys(x).findIndex(y=>(x[y]+"").toUpperCase().includes(key))
        return index>-1;
      })
      filterdata = Array.isArray(filterdata)?filterdata:[filterdata];
      setFilterdTransection(filterdata)
    }
    
  }

  // form handling
  const handleSubmit = async (values) => {
    try {
      
      setLoading(true);  
      
      // in if condition edit transaction is there 
      if(editable)
      {
        let res = await axios.post("http://localhost:5000/transections/edit-transection", {
          token,
          payload : {
            ...values
          },
          transacationId:editable._id
        });
        if(res.status==200){
          message.success("Transaction Updated Successfully");
        }else{
          message.success("Transaction Updated Fail");
        }
        setLoading(false);
        

      }
      else{
        let res = await axios.post("http://localhost:5000/transections/add-transection", {
          ...values,
          token,
        });
        if(res.status==201){
          message.success("Transaction Added Successfully");
        }else{
          message.success("Transaction Adding Fail");
        }
        console.log(res.data)
        setLoading(false);
        

      }
     
      setShowModal(false);
      getAllTransaction();
    } catch (error) {
      setLoading(false);
      message.error("Faild to add transection");
    }
  };


  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      // Call the report generation function
      await generateTransactionReport(allTransection);
      setLoading(false);
      message.success("Transaction Report Generated!");
    } catch (error) {
      console.error(error);
      setLoading(false);
      message.error("Failed to generate report!");
    }
  };


  return (
    <Layout>
      {/* spinner  */}
      {loading && <Spinner />}

      {/* filter */}
      <div className="filters">
      <div>
        <h6>&nbsp;</h6>
        <input onInput={doSearch} style={{'min-width':'100px'}} placeholder="Search.." className="form-control"></input>
      </div>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>

        {/* graph switch */}
        <div>
          <h6>&nbsp;</h6>
        <div className="switch-icons "> 

            <UnorderedListOutlined className={`mx-2 btn-outline-warning ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`} onClick={() => setViewData("table")} />

            <AreaChartOutlined  className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`} onClick={() => setViewData("analytics")} />

        </div>
        </div>

          {/* graph */}




      <div>
      {/* <div className="container mb-4 mt-4 p-3">
        <div className="row">
            <button className="btn btn-primary" onClick={handleGenerateReport}>
              Generate Report
            </button>
        </div>
      </div> */}
    </div>


      <div>
        <h6>&nbsp;</h6>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-primary btn-lg" onClick={handleGenerateReport}>Generate Report</button>
          <button type="button" className="btn btn-success btn-lg" 
          onClick={() => {
            setShowModal(true);
            setEditable(null);
            setTimeout(() => {
              addForm.resetFields();
            }, 50);
          }}
          >Add New</button>
        </div>
        </div>
      </div>



      {/* filter end */}


      {/*  table data  */}
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={filterdTransection} />
        ) : (
          <Analytics allTransection={allTransectionAnalize} />
        )}
      </div>

      {/* table end */}

      {/* model form */}
      <Modal
        title={editable ? 'Edit Transaction' : 'Add Transection'}
        open={showModal}
        onCancel={() => {setShowModal(false);}}
        footer={false}
      >
        <Form Layout="vertical" onFinish={handleSubmit} initialValues={editable} form={addForm}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select the type!' }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select the category!' }]}>
            <Select>
              <Select.Option value="Service">Service Revenue</Select.Option>
              <Select.Option value="Retail">Retail Sales</Select.Option>
              <Select.Option value="Membership">Membership and Subscriptions</Select.Option>
              <Select.Option value="Special">Special Events and Parties</Select.Option>
              <Select.Option value="Gift">Gift Card Sales</Select.Option>
              <Select.Option value="Payroll">Payroll and Commisions</Select.Option>
              <Select.Option value="Supplies">Supplies and Inventory</Select.Option>
              <Select.Option value="Rent">Rent and Tax</Select.Option>
              <Select.Option value="Maintenance">Equipment Maintenance</Select.Option>
              <Select.Option value="Marketing">Marketing and Advertising</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select the date!' }]}>
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Refrence" name="refrence" rules={[{ required: true, message: 'Please select the refrence!' }]}>
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please select the description!' }]}>
            <Input type="text" />
          </Form.Item>

          <div className="d-flex justify-content-end ">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
        
      </Modal>

      {/* model end */}

    </Layout>
  );
};

export default IncomeHomepage;


