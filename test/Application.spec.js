import React from 'react';
const expect = require('chai').expect;

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application';
import MessageFilters from '../lib/components/MessageFilters';
import MessageInput from '../lib/components/MessageInput';
import mockMessages from './mockmessages';

describe('Application', () => {
  context('mount', function() {
    let user = mockMessages[0].user;
    const wrapper = mount(<Application />)
    wrapper.state.user = user;
    wrapper.state().messages = mockMessages;

    it('should have a user', () => {
      expect(wrapper.state.user).to.equal(user);
    });

    it('should have an array of messages', () => {
      expect(wrapper.state().messages).to.equal(mockMessages);
    });

    it('should have default null filter, sort false, and selectedUser null', () => {
      expect(wrapper.state().filter).to.equal('');
      expect(wrapper.state().sort).to.equal(false);
      expect(wrapper.state().selectedUser).to.equal(null);
    });

    it('should have virtual dom components', () => {
      expect(wrapper.find('.MessageFilters')).to.have.length(1);
      expect(wrapper.find('.NonActiveUser')).to.have.length(1);
      expect(wrapper.find('.Messages')).to.have.length(1);
      expect(wrapper.find('.Users')).to.have.length(1);
    });

    it('should have 11 messages in the message list', () => {
      expect(wrapper.find('.individualMessage')).to.have.length(11);
    });

    // it.skip('should have the first message in the array rendered first', () => {
    //   expect(wrapper.find('.individualMessage').first()).to.equal(mockMessages[0]);
    // });

    it('should have 7 users in the user list', () => {
      expect(wrapper.find('.User')).to.have.length(7);
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
  context('shallow', function () {
    let user = mockMessages[0].user;
    const wrapper = shallow(<MessageInput user={user} />)

    it('renders as a <div>', () => {
      assert.equal(wrapper.type(), 'div');
    });

    it('contains two buttons and one input', () => {
      expect(wrapper.find('button')).to.have.length(2)
      expect(wrapper.find('.ActualMessageInput')).to.have.length(1)
    })

    it('renders a addNewMessage button', () => {
      expect(wrapper.text()).to.contain('Submit');
    });

    it('renders a Clear button', () => {
      expect(wrapper.text()).to.contain('Clear');
    });

    it('renders a character counter', () => {
      expect(wrapper.text()).to.contain('0');
    });
  });
  context('mount', function () {
    let user = mockMessages[0].user;
    const wrapper = mount(<MessageInput user={user} />)


    it('has state of draftMessage and property of user and addNewMessage', () => {
      expect(wrapper.state().draftMessage).to.equal('')
    });

    it('input fields can take values which get cleared when clear is pressed', () => {
      wrapper.find('input').simulate('keydown', { which: 'a'})
      expect(wrapper.text('input')).to.contain('a')
      wrapper.find('.Clear').simulate('click')
      expect(wrapper.text('input')).to.contain('')
    });
  });
});


describe('MessageFilters', () => {
  context('mount', () => {
    const wrapper = mount(<MessageFilters />)
    // it('input fields can take values for search', () => {
    //   wrapper.find('input').simulate('keydown', { which: 'a'})
    //   expect(wrapper.text('input')).to.contain('a')
    // });
  });
  context('shallow', () => {
    const wrapper = shallow(<MessageFilters />)
    it('renders two sort buttons', () => {
      expect(wrapper.find('.SortButton')).to.have.length(2)
    });

    it('has an input field', () => {
      expect(wrapper.find('.Filter')).to.have.length(1)
    });
  });
});
