import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChannelComp from './channelComp';
import ViewComp from '../viewComp/viewComp';

configure({adapter: new Adapter()});

describe('<channelComp/>', ()=>{
    it('should render seven <ViewComp /> elements', ()=>{
        const wrapper:any = shallow(<ChannelComp/>);
        expect(wrapper.find(ViewComp)).toHaveLength(8);
    })
})