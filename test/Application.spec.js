import React from 'react';
const expect = require('chai').expect;

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application';
import MessageFilters from '../lib/components/MessageFilters';
import MessageInput from '../lib/components/MessageInput';
import mockMessages from './mockmessages'

describe('Application', () => {
  context('mount', function() {
    let user = mockMessages[0].user;
    const wrapper = mount(<Application />)
    wrapper.state.user = user;
    wrapper.state.messages = mockMessages;

    it('renders an input field', () => {
      expect(wrapper.state.user).to.equal(user);
    });
    it('should have v-dom components', () => {
      expect(wrapper.find('.MessageFilters')).to.have.length(1);
      expect(wrapper.find('.ActiveUser')).to.have.length(1);
      expect(wrapper.find('.Messages')).to.have.length(1);
      expect(wrapper.find('.Users')).to.have.length(1);
      expect(wrapper.find('.MessageInput')).to.have.length(1);
    });
  });

  context('shallow', function() {
    let user = mockMessages[0].user;
    const wrapper = shallow(<Application />)
    wrapper.state.user = user;
    it('renders as a <div>', () => {
      assert.equal(wrapper.type(), 'div');
    });
  });
});

describe('MessageInput', () => {

  let user = {
  displayName: 'Madison Kerndt' ,
      email: 'madison.kerndt@gmail.com',
      uid: 'eDnoVr1f5OZlySEszpbYSI2IcxG2'
  };

  it('renders as a <div>', () => {
    const wrapper = shallow(<MessageInput user={'potato'} />)
    assert.equal(wrapper.type(), 'div');
  });

  it('renders a addNewMessage button', () => {
    const wrapper = render(<MessageInput user={'potato'} />)
    expect(wrapper.text()).to.contain('Add New Message');
  });

  it('renders a Clear button', () => {
    const wrapper = render(<MessageInput user={'potato'} />)
    expect(wrapper.text()).to.contain('Clear');
  });

  it('renders a character counter', () => {
    const wrapper = render(<MessageInput user={'potato'} />)
    expect(wrapper.text()).to.contain('0');
  });
  // 
  // it('renders an input field', () => {
  //   const wrapper = mount(<MessageInput user={'potato'}/>)
  //   expect(wrapper.find('.ActualMessageInput').to.have.length(1));
  // });

  it.skip('can click on the NewMessageSubmit button', () => {
    const wrapper = render(<MessageInput user={'potato'} />)
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
