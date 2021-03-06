import React from 'react';
import { shallow } from 'enzyme';

import Datatable from '../src/index';

const cell_transform = (row) => row.name.split(' ').reverse().join(' ');

function setup() {
  const tableHeader = [
    { title: 'Username', prop: 'userID', sortable: true, filterable: true },
    { title: 'Person Name', prop: 'name', sortable: true, filterable: true },
    { title: 'Person Name (reversed)', prop: 'name', cell: cell_transform, sortable: true, filterable: true },
  ];

  const tableBody = [
    { userID: "i-am-tyler-1", name: "Tyler Olfson 1" },
    { userID: "i-am-tyler-2", name: "Tyler Olfson 2" },
    { userID: "i-am-tyler-3", name: "Tyler Olfson 3" },
    { userID: "i-am-tyler-4", name: "Tyler Olfson 4" },
    { userID: "i-am-tyler-5", name: "Tyler Olfson 5" },
    { userID: "i-am-tyler-6", name: "Tyler Olfson 6" },
    { userID: "sir-bobby-1", name: "Bobby Charly 1" },
    { userID: "sir-bobby-2", name: "Bobby Charly 2" },
    { userID: "sir-bobby-3", name: "Bobby Charly 3" },
    { userID: "sir-bobby-4", name: "Bobby Charly 4" },
    { userID: "sir-bobby-5", name: "Bobby Charly 5" },
    { userID: "sir-bobby-6", name: "Bobby Charly 6" },
  ];

  const props = {
    tableHeader: tableHeader,
    tableBody: tableBody,
    tableClass: 'table table-striped table-responsive',
    rowsPerPage: 5,
    rowsPerPageOption: [5, 10, 15, 20],
    initialSort: {
      prop: 'userID',
      isAscending: true,
    },
    keyName: 'test-table'
  };

  const enzymeWrapper = shallow(
    <Datatable {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('Datatable component (js/component/Datatable)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.tableHeader).toEqual([
      { title: 'Username', prop: 'userID', sortable: true, filterable: true },
      { title: 'Person Name', prop: 'name', sortable: true, filterable: true },
      { title: 'Person Name (reversed)', prop: 'name', cell: cell_transform, sortable: true, filterable: true },
    ]);
    expect(enzymeWrapper.instance().props.tableBody).toEqual([
      { userID: "i-am-tyler-1", name: "Tyler Olfson 1" },
      { userID: "i-am-tyler-2", name: "Tyler Olfson 2" },
      { userID: "i-am-tyler-3", name: "Tyler Olfson 3" },
      { userID: "i-am-tyler-4", name: "Tyler Olfson 4" },
      { userID: "i-am-tyler-5", name: "Tyler Olfson 5" },
      { userID: "i-am-tyler-6", name: "Tyler Olfson 6" },
      { userID: "sir-bobby-1", name: "Bobby Charly 1" },
      { userID: "sir-bobby-2", name: "Bobby Charly 2" },
      { userID: "sir-bobby-3", name: "Bobby Charly 3" },
      { userID: "sir-bobby-4", name: "Bobby Charly 4" },
      { userID: "sir-bobby-5", name: "Bobby Charly 5" },
      { userID: "sir-bobby-6", name: "Bobby Charly 6" },
    ]);
    expect(enzymeWrapper.instance().props.tableClass).toEqual(
      'table table-striped table-responsive'
    );
    expect(enzymeWrapper.instance().props.rowsPerPage).toBe(5);
    expect(enzymeWrapper.instance().props.rowsPerPageOption).toEqual([5, 10, 15, 20]);
    expect(enzymeWrapper.instance().props.initialSort).toEqual({
      prop: 'userID',
      isAscending: true,
    });
    expect(enzymeWrapper.instance().props.keyName).toBe('test-table');

    expect(enzymeWrapper.find('Row').length).toBe(1);
    expect(enzymeWrapper.find('Col').length).toBe(4);
    expect(enzymeWrapper.find('Table').length).toBe(1);

    expect(enzymeWrapper.find('thead').length).toBe(1);
    expect(enzymeWrapper.find('tbody').length).toBe(1);
  });

  it('should change the sortedProp state', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.state('sortedProp')).toEqual({
      prop: 'userID',
      isAscending: true,
    });

    enzymeWrapper.find('.thead-th-default').at(0).simulate('click', {
      preventDefault: jest.fn(),
    });

    expect(enzymeWrapper.state('sortedProp')).toEqual({
      prop: 'userID',
      isAscending: false,
    });
  });

  it('should change the rows per page state', () => {
    const { props, enzymeWrapper } = setup();
    const value = 15;
    const selectedDom = enzymeWrapper.find('[name="form-control-pagination"]');

    expect(enzymeWrapper.state('rowsPerPage')).toEqual(5);

    selectedDom.simulate('change', {
      preventDefault: jest.fn(),
      target: {value},
    });

    expect(enzymeWrapper.state('rowsPerPage')).toEqual(value);
  });

  it('should navigate to the other page', () => {
    const { props, enzymeWrapper } = setup();
    const selectedDom = enzymeWrapper.findWhere(n => n.key() === 'test-table-page-last');

    expect(enzymeWrapper.state('currentPage')).toEqual(1);

    selectedDom.simulate('click', {
      preventDefault: jest.fn(),
    });

    expect(enzymeWrapper.state('currentPage')).toEqual(3);
  });
});
