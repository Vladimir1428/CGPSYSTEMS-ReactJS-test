import "./clientModal.scss"
import React  from 'react';
import {  Button, Input, Modal, Form, DatePicker, Row, Col, InputNumber } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import moment from "moment"
import { addData } from "../../../slices/dataSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid } from 'uuid';
import { ClientModel } from "../../../Model/ClientModel"

interface ClientModalProps {
  openModal: (value: boolean) => any
  open: boolean
}

export const ClientModal: React.FC<ClientModalProps> = ({ openModal, open }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const  submit = async ()=>{
    const formData: ClientModel = await form.getFieldsValue()
    const Data = {
      ...formData,
      key: uuid(),
      since: moment(formData.since.toString()).format('ll'),
      status: "Active"
    }
    dispatch(addData(Data))
    form.resetFields()
    openModal(false)
  }
  const Close = ()=>{
    form.resetFields()
    openModal(false)
  }  
  const onCancel = ()=>{
    form.resetFields()
  }

  return (
    <Modal
      title="New Client"
      open={open}
      footer={null}
      onCancel={Close}
    >
      <Form
        form={form} 
        onFinish={submit}
        className="form"
      >
        <label className="form__label">Client</label>
        <Form.Item name="client"  rules={[{ required: true, message: 'Please input client name!' }]}>
          <Input placeholder="Client name"/>
        </Form.Item>
        <Row gutter={8}>
          <Col span={12}>
            <label className="form__label">Total Earnings</label>
            <Form.Item name="totalEarnings" rules={[{ required: true, message: 'Please input total earnings!' }]}>
              <InputNumber type="number" controls={false}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <label className="form__label">Available Credit</label>
            <Form.Item name="credit" rules={[{ required: true, message: 'Please input credit!' }]}>
              <InputNumber type="number" controls={false}/>
            </Form.Item>
          </Col>
        </Row>
        <label className="form__label">Notes</label>
        <Form.Item name="notes" rules={[{ required: true, message: 'Please input notes!' }]}>
          <Input/>
        </Form.Item >
        <label className="form__label">Client Since</label>
        <div className="form__date-picker">
          <div className="form__search-icon">
            <FontAwesomeIcon style={{marginTop: 10}} icon={faCalendar} />
          </div>
          <Form.Item className="form__datepicker"name="since" rules={[{ required: true, message: 'Please input client since!' }]}>
            <DatePicker inputReadOnly={true} style={{height:"36px", width: "213px"}} suffixIcon="" placeholder=""/>
          </Form.Item >
        </div>
        <div className="form__main-contact">
          <label className="form__main-contact-title">Main Contact</label>
            <Row gutter={8}>
              <Col span={12}>
                <label className="form__label-main-contact">First Name</label>
                <Form.Item name="firstName" rules={[{ required: true, message: 'Please input first name!' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <label className="form__label-main-contact">Last Name</label>
                <Form.Item name="lastName" rules={[{ required: true, message: 'Please input last name!' }]}>
                  <Input/>
                </Form.Item >
              </Col>
            </Row>
        </div>
        <Form.Item>
          <Button className="form__save-btn" htmlType="submit" >Save</Button>
          <Button className="form__cancel-btn" onClick={onCancel} >Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>     
  )
}