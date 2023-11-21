import { AzureFunction } from '@azure/functions';
import httpTrigger from './httpTrigger';

const azureFunction: AzureFunction = httpTrigger;

export default azureFunction;
