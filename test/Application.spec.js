import React from 'react';
const expect = require('chai').expect;

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application';
import MessageFilters from '../lib/components/MessageFilters';
import MessageInput from '../lib/components/MessageInput';

describe('Application', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });

  it.skip('calls componentDidMount', () => {
    const wrapper = mount(<Application />)
    expect(Application.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('renders the MessageFilters component', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.contains(<MessageFilters />)).to.be.true
  });

  it.skip('renders the MessageInput component', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.contains(<MessageInput />)).to.be.true
  });



});

describe('MessageInput', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<MessageInput />)
    assert.equal(wrapper.type(), 'div');
  });

  it('renders a addNewMessage button', () => {
    const wrapper = render(<MessageInput />)
    expect(wrapper.text()).to.contain('Add New Message');
  });

  it('renders a Clear button', () => {
    const wrapper = render(<MessageInput />)
    expect(wrapper.text()).to.contain('Clear');
  });

  it('renders a character counter', () => {
    const wrapper = render(<MessageInput />)
    expect(wrapper.text()).to.contain('0');
  });

  it.skip('renders an input field', () => {
    const wrapper = render(<MessageInput />)
    expect(wrapper.find('.ActualMessageInput').to.have.length(1));
  });

  it.skip('can click on the NewMessageSubmit button', () => {
    const wrapper = render(<MessageInput />)
    wrapper.state().count = 0
    var button = wrapper.find('.NewMessageSubmit').simulate('click')

    expect(wrapper.state().count).to.equal(1)
  });
});

describe('MessageFilters', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<MessageFilters />)
    assert.equal(wrapper.type(), 'div');
  });

  it('renders two sort buttons', () => {
    const wrapper = render(<MessageFilters />)
    expect(wrapper.find('.SortButton')).to.have.length(2)
  });

  it.skip('can click a SortButton', () => {
    const wrapper = render(<MessageFilters />)
    wrapper.state().count = 0
    var button = wrapper.find('.SortButton').simulate('click')

    expect(wrapper.state().count).to.equal(1)
  });

});
