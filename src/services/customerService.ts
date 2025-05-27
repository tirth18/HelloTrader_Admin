import axiosInstance from './axiosInstance';

// Type definitions based on the backend model
export interface OrderPointDistance {
  min_distance: number;
  max_distance: number;
  GOLDM?: number;
  SILVERM?: number;
  BULLDEX?: number;
  GOLD?: number;
  SILVER?: number;
  CRUDEOIL?: number;
  COPPER?: number;
  NICKEL?: number;
  ZINC?: number;
  LEAD?: number;
  NATURALGAS?: number;
  NATURALGAS_MINIM?: number;
  ALUMINIUM?: number;
  MENTHAOIL?: number;
  COTTON?: number;
  SILVERMIC?: number;
  ZINCMINI?: number;
  ALUMINI?: number;
  LEADMINI?: number;
  CRUDEOIL_MINIM?: number;
}

export interface PersonalDetails {
  name: string;
  mobile: string;
  username: string;
  password: string;
  initial_funds: number;
  city: string;
}

export interface ConfigSettings {
  demo_account: boolean;
  allow_fresh_entry_order_above_high_below_low: boolean;
  allow_orders_between_high_low: boolean;
  trade_equity_as_units: boolean;
  account_status: string;
  autoCloseTrades: boolean;
  auto_close_trades_loss_percent: number;
  notify_client_loss_percent: number;
}

export interface MCXFutures {
  mcx_trading: boolean;
  min_lot_size: number;
  max_lot_size: number;
  max_lot_size_per_script: number;
  max_size_all_commodity: number;
  brokerage_type: string;
  brokerage: number;
  exposure_type: string;
  intraday_exposure: number;
  holding_exposure: number;
  order_point_distance: OrderPointDistance;
}

export interface EquityFutures {
  equity_trading: boolean;
  equity_brokerage_per_crore: number;
  min_lot_size: number;
  max_lot_size: number;
  min_lot_size_index: number;
  max_lot_size_index: number;
  max_lot_size_per_script: number;
  max_lot_size_per_script_index: number;
  max_size_all_equity: number;
  max_size_all_index: number;
  intraday_exposure: number;
  holding_exposure: number;
  order_percentage_distance: number;
}

export interface OptionsConfig {
  index_options_trading: boolean;
  equity_options_trading: boolean;
  mcx_options_trading: boolean;
  index_brokerage_type: string;
  index_brokerage: number;
  equity_brokerage_type: string;
  equity_brokerage: number;
  mcx_brokerage_type: string;
  mcx_brokerage: number;
  min_bid_price: number;
  index_short_selling: boolean;
  equity_short_selling: boolean;
  mcx_short_selling: boolean;
  min_lot_equity: number;
  max_lot_equity: number;
  min_lot_index: number;
  max_lot_index: number;
  min_lot_mcx: number;
  max_lot_mcx: number;
  max_open_lot_equity: number;
  max_open_lot_index: number;
  max_open_lot_mcx: number;
  max_size_all_equity: number;
  max_size_all_index: number;
  max_size_all_mcx: number;
  intraday_exposure_index: number;
  holding_exposure_index: number;
  intraday_exposure_equity: number;
  holding_exposure_equity: number;
  intraday_exposure_mcx: number;
  holding_exposure_mcx: number;
  order_percentage_distance: number;
}

export interface OptionsShortsellingConfig {
  index_brokerage_type_short: string;
  index_brokerage_short: number;
  equity_brokerage_type_short: string;
  equity_brokerage_short: number;
  mcx_brokerage_type_short: string;
  mcx_brokerage_short: number;
  min_lot_equity_short: number;
  max_lot_equity_short: number;
  min_lot_mcx_short: number;
  max_lot_mcx_short: number;
  min_lot_index_short: number;
  max_lot_index_short: number;
  max_open_lot_equity_short: number;
  max_open_lot_index_short: number;
  max_open_lot_mcx_short: number;
  max_size_all_equity_short: number;
  max_size_all_index_short: number;
  max_size_all_mcx_short: number;
  intraday_exposure_index_short: number;
  holding_exposure_index_short: number;
  intraday_exposure_equity_short: number;
  holding_exposure_equity_short: number;
  intraday_exposure_mcx_short: number;
  holding_exposure_mcx_short: number;
}

export interface OtherSettings {
  notes: string;
  broker: string;
  select_user: string;
  transaction_password: string;
}

export interface CustomerData {
  id?: number;
  personal_details: PersonalDetails;
  config: ConfigSettings;
  mcx_futures: MCXFutures;
  equity_futures: EquityFutures;
  options_config: OptionsConfig;
  options_shortselling_config: OptionsShortsellingConfig;
  other: OtherSettings;
}

// Default values for new customer
export const getDefaultOrderPointDistance = (): OrderPointDistance => {
  return {
    min_distance: 0,
    max_distance: 0,
    GOLDM: 0,
    SILVERM: 0,
    BULLDEX: 0,
    GOLD: 0,
    SILVER: 0,
    CRUDEOIL: 0,
    COPPER: 0,
    NICKEL: 0,
    ZINC: 0,
    LEAD: 0,
    NATURALGAS: 0,
    NATURALGAS_MINIM: 0,
    ALUMINIUM: 0,
    MENTHAOIL: 0,
    COTTON: 0,
    SILVERMIC: 0,
    ZINCMINI: 0,
    ALUMINI: 0,
    LEADMINI: 0,
    CRUDEOIL_MINIM: 0,
  };
};

export const getDefaultCustomerData = (): CustomerData => {
  return {
    personal_details: {
      name: '',
      mobile: '',
      username: '',
      password: '',
      initial_funds: 0,
      city: '',
    },
    config: {
      demo_account: false,
      allow_fresh_entry_order_above_high_below_low: false,
      allow_orders_between_high_low: false,
      trade_equity_as_units: false,
      account_status: 'Active',
      autoCloseTrades: false,
      auto_close_trades_loss_percent: 90,
      notify_client_loss_percent: 70,
    },
    mcx_futures: {
      mcx_trading: false,
      min_lot_size: 0,
      max_lot_size: 20,
      max_lot_size_per_script: 50,
      max_size_all_commodity: 100,
      brokerage_type: 'Per Crore Basis',
      brokerage: 800,
      exposure_type: 'Per Turnover Basis',
      intraday_exposure: 500,
      holding_exposure: 100,
      order_point_distance: getDefaultOrderPointDistance(),
    },
    equity_futures: {
      equity_trading: false,
      equity_brokerage_per_crore: 800,
      min_lot_size: 0,
      max_lot_size: 50,
      min_lot_size_index: 0,
      max_lot_size_index: 20,
      max_lot_size_per_script: 100,
      max_lot_size_per_script_index: 100,
      max_size_all_equity: 100,
      max_size_all_index: 100,
      intraday_exposure: 500,
      holding_exposure: 100,
      order_percentage_distance: 0,
    },
    options_config: {
      index_options_trading: false,
      equity_options_trading: false,
      mcx_options_trading: false,
      index_brokerage_type: 'Per Lot Basis',
      index_brokerage: 25,
      equity_brokerage_type: 'Per Lot Basis',
      equity_brokerage: 40,
      mcx_brokerage_type: 'Per Lot Basis',
      mcx_brokerage: 50,
      min_bid_price: 2,
      index_short_selling: true,
      equity_short_selling: false,
      mcx_short_selling: false,
      min_lot_equity: 1,
      max_lot_equity: 10,
      min_lot_index: 1,
      max_lot_index: 20,
      min_lot_mcx: 1,
      max_lot_mcx: 20,
      max_open_lot_equity: 10,
      max_open_lot_index: 20,
      max_open_lot_mcx: 10,
      max_size_all_equity: 10,
      max_size_all_index: 10,
      max_size_all_mcx: 10,
      intraday_exposure_index: 7,
      holding_exposure_index: 3,
      intraday_exposure_equity: 10,
      holding_exposure_equity: 3,
      intraday_exposure_mcx: 10,
      holding_exposure_mcx: 3,
      order_percentage_distance: 0,
    },
    options_shortselling_config: {
      index_brokerage_type_short: 'Per Lot Basis',
      index_brokerage_short: 50,
      equity_brokerage_type_short: 'Per Lot Basis',
      equity_brokerage_short: 20,
      mcx_brokerage_type_short: 'Per Lot Basis',
      mcx_brokerage_short: 20,
      min_lot_equity_short: 0,
      max_lot_equity_short: 20,
      min_lot_mcx_short: 1,
      max_lot_mcx_short: 20,
      min_lot_index_short: 0,
      max_lot_index_short: 20,
      max_open_lot_equity_short: 5,
      max_open_lot_index_short: 10,
      max_open_lot_mcx_short: 7,
      max_size_all_equity_short: 20,
      max_size_all_index_short: 20,
      max_size_all_mcx_short: 30,
      intraday_exposure_index_short: 2,
      holding_exposure_index_short: 1,
      intraday_exposure_equity_short: 3,
      holding_exposure_equity_short: 2,
      intraday_exposure_mcx_short: 5,
      holding_exposure_mcx_short: 3,
    },
    other: {
      notes: '',
      broker: '',
      select_user: '',
      transaction_password: '',
    },
  };
};

// API Service functions
export const getCustomers = async () => {
  try {
    const response = await axiosInstance.get('/customers');
    console.log('Raw API Response:', response.data);
    
    // Check if the response is an array or if it has a specific structure
    let customersData;
    if (Array.isArray(response.data)) {
      // Return the array directly
      customersData = response.data;
    } else if (response.data.customers) {
      // If the API returns { customers: [...] }
      customersData = response.data.customers;
    } else if (response.data.data) {
      // If the API returns { data: [...] }
      customersData = response.data.data;
    } else if (response.data.results) {
      // If the API returns { results: [...] }
      customersData = response.data.results;
    } else {
      // Return the data as is
      customersData = response.data;
    }

    // Transform each customer to add the autoCloseTrades field
    if (Array.isArray(customersData)) {
      customersData = customersData.map(customer => {
        if (customer && customer.config && customer.config.hasOwnProperty('auto_close_trades_loss_percent')) {
          customer.config.autoCloseTrades = customer.config.auto_close_trades_loss_percent > 0;
        }
        return customer;
      });
    }

    return customersData;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (customerId: number) => {
  try {
    const response = await axiosInstance.get(`/customers/${customerId}?full_details=true`);
    console.log('Raw customer detail API response:', response.data);
    
    // Check if the response has a specific structure
    let customerData;
    if (response.data.customer) {
      customerData = response.data.customer;
    } else if (response.data.data) {
      customerData = response.data.data;
    } else {
      customerData = response.data;
    }

    // Transform the customerData to add the autoCloseTrades field based on auto_close_trades_loss_percent
    if (customerData.config && customerData.config.hasOwnProperty('auto_close_trades_loss_percent')) {
      const autoCloseTradesEnabled = customerData.config.auto_close_trades_loss_percent > 0;
      customerData.config.autoCloseTrades = autoCloseTradesEnabled;
    }

    return customerData;
  } catch (error) {
    console.error(`Error fetching customer ${customerId}:`, error);
    throw error;
  }
};

export const createCustomer = async (customerData: CustomerData) => {
  try {
    // Create a deep copy of the data to prevent modifying the original
    const dataToSend = JSON.parse(JSON.stringify(customerData));
    
    // Handle autoCloseTrades field - if it's false, set auto_close_trades_loss_percent to 0
    if (dataToSend.config && dataToSend.config.hasOwnProperty('autoCloseTrades')) {
      // If autoCloseTrades is false, set auto_close_trades_loss_percent to 0
      if (!dataToSend.config.autoCloseTrades) {
        dataToSend.config.auto_close_trades_loss_percent = 0;
      }
      // Remove the autoCloseTrades field since the backend doesn't have this field
      delete dataToSend.config.autoCloseTrades;
    }
    
    // Fix field mapping for options_config to match backend expectations
    if (dataToSend.options_config) {
      dataToSend.options_config.max_size_all_equity_options = dataToSend.options_config.max_size_all_equity;
      dataToSend.options_config.max_size_all_index_options = dataToSend.options_config.max_size_all_index;
      dataToSend.options_config.max_size_all_mcx_options = dataToSend.options_config.max_size_all_mcx;
      dataToSend.options_config.intraday_exposure_index_options = dataToSend.options_config.intraday_exposure_index;
      dataToSend.options_config.holding_exposure_index_options = dataToSend.options_config.holding_exposure_index;
      dataToSend.options_config.intraday_exposure_equity_options = dataToSend.options_config.intraday_exposure_equity;
      dataToSend.options_config.holding_exposure_equity_options = dataToSend.options_config.holding_exposure_equity;
      dataToSend.options_config.intraday_exposure_mcx_options = dataToSend.options_config.intraday_exposure_mcx;
      dataToSend.options_config.holding_exposure_mcx_options = dataToSend.options_config.holding_exposure_mcx;
      dataToSend.options_config.order_percentage_distance_options = dataToSend.options_config.order_percentage_distance;
    }
    
    // Fix field mapping for equity_futures to match backend expectations
    if (dataToSend.equity_futures) {
      dataToSend.equity_futures.intraday_exposure_equity = dataToSend.equity_futures.intraday_exposure;
      dataToSend.equity_futures.holding_exposure_equity = dataToSend.equity_futures.holding_exposure;
      dataToSend.equity_futures.order_percentage_distance_equity = dataToSend.equity_futures.order_percentage_distance;
    }
    
    // Move other fields to the top level structure as expected by backend
    if (dataToSend.other) {
      if (dataToSend.other.notes) dataToSend.notes = dataToSend.other.notes;
      if (dataToSend.other.broker) dataToSend.broker = dataToSend.other.broker;
      if (dataToSend.other.select_user) dataToSend.select_user = dataToSend.other.select_user;
      if (dataToSend.other.transaction_password) dataToSend.transaction_password = dataToSend.other.transaction_password;
    }
    
    console.log('Sending customer data to API:', JSON.stringify(dataToSend, null, 2));
    const response = await axiosInstance.post('/customers', dataToSend);
    console.log('Customer created successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating customer:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

export const updateCustomer = async (customerId: number, customerData: CustomerData) => {
  try {
    // Create a deep copy of the data to prevent modifying the original
    const dataToSend = JSON.parse(JSON.stringify(customerData));
    
    // Handle autoCloseTrades field - if it's false, set auto_close_trades_loss_percent to 0
    if (dataToSend.config && dataToSend.config.hasOwnProperty('autoCloseTrades')) {
      // If autoCloseTrades is false, set auto_close_trades_loss_percent to 0
      if (!dataToSend.config.autoCloseTrades) {
        dataToSend.config.auto_close_trades_loss_percent = 0;
      }
      // Remove the autoCloseTrades field since the backend doesn't have this field
      delete dataToSend.config.autoCloseTrades;
    }
    
    // Fix field mapping for options_config to match backend expectations
    if (dataToSend.options_config) {
      dataToSend.options_config.max_size_all_equity_options = dataToSend.options_config.max_size_all_equity;
      dataToSend.options_config.max_size_all_index_options = dataToSend.options_config.max_size_all_index;
      dataToSend.options_config.max_size_all_mcx_options = dataToSend.options_config.max_size_all_mcx;
      dataToSend.options_config.intraday_exposure_index_options = dataToSend.options_config.intraday_exposure_index;
      dataToSend.options_config.holding_exposure_index_options = dataToSend.options_config.holding_exposure_index;
      dataToSend.options_config.intraday_exposure_equity_options = dataToSend.options_config.intraday_exposure_equity;
      dataToSend.options_config.holding_exposure_equity_options = dataToSend.options_config.holding_exposure_equity;
      dataToSend.options_config.intraday_exposure_mcx_options = dataToSend.options_config.intraday_exposure_mcx;
      dataToSend.options_config.holding_exposure_mcx_options = dataToSend.options_config.holding_exposure_mcx;
      dataToSend.options_config.order_percentage_distance_options = dataToSend.options_config.order_percentage_distance;
    }
    
    // Fix field mapping for equity_futures to match backend expectations
    if (dataToSend.equity_futures) {
      dataToSend.equity_futures.intraday_exposure_equity = dataToSend.equity_futures.intraday_exposure;
      dataToSend.equity_futures.holding_exposure_equity = dataToSend.equity_futures.holding_exposure;
      dataToSend.equity_futures.order_percentage_distance_equity = dataToSend.equity_futures.order_percentage_distance;
    }
    
    // Move other fields to the top level structure as expected by backend
    if (dataToSend.other) {
      if (dataToSend.other.notes) dataToSend.notes = dataToSend.other.notes;
      if (dataToSend.other.broker) dataToSend.broker = dataToSend.other.broker;
      if (dataToSend.other.select_user) dataToSend.select_user = dataToSend.other.select_user;
      if (dataToSend.other.transaction_password) dataToSend.transaction_password = dataToSend.other.transaction_password;
    }
    
    console.log(`Updating customer ${customerId} with data:`, JSON.stringify(dataToSend, null, 2));
    const response = await axiosInstance.put(`/customers/${customerId}`, dataToSend);
    console.log('Customer updated successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error updating customer ${customerId}:`, error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

export const deleteCustomer = async (customerId: number) => {
  try {
    await axiosInstance.delete(`/customers/${customerId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting customer ${customerId}:`, error);
    throw error;
  }
}; 