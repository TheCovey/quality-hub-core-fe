import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import * as rtl from "@testing-library/react";
// import wait from 'waait';

// Import component and query for testing
import CoachForm from './CoachForm';
// import { ADD_POST } from '../CoachForm/CoachForm';

// gets rid of act() warning when called after render
async function wait(ms = 0) {
    await rtl.act(() => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    });
  } 

// Test React components by mocking calls to the GraphQL endpoint; this allows tests to be run in isolation and removes dependence on remote data
it('coach cards should render without error', async () => {

     rtl.render(
        <MockedProvider >
            <CoachForm />
        </MockedProvider>
    )
    await wait();
});


    // const mocks = [
    //     {
    //         request: {
    //             query: ADD_POST,
    //         },
    //         result: {
    //             data: {
    //                 id: '',
    //                 price: '',
    //                 position: '',
    //                 industry: {
    //                     id: '',
    //                     name: '',
    //                 },
    //                 description: '',
    //                 tags: {
    //                     id: '',
    //                     name: '',
    //                 },
    //                 company: '',
    //                 coach: {
    //                     id: '',
    //                     first_name: '',
    //                     last_name: '',
    //                     city: '',
    //                     state: '',
    //                     image_url: '',
    //                     personal_url: '',
    //                     blog_url: '',
    //                     twitter_url: '',
    //                     portfolio_url: '',
    //                     linkedin_url: '',
    //                     github_url: '',
    //                 },
    //             },
    //         },
    //     },
    // ];
