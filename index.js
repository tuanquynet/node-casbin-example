import { newEnforcer } from 'casbin';
import mongodbAdapter from './adapters/mongodb-adapter';

async function startWithBasicModel() {
  const enforcer = await newEnforcer('config/basic_model.conf', 'config/basic_policy.csv');

  const sub = 'alice'; // the user that wants to access a resource.
  const obj = 'data1'; // the resource that is going to be accessed.
  const act = 'read'; // the operation that the user performs on the resource.

  const res = await enforcer.enforce(sub, obj, act);
  if (res) {
    // permit alice to read data1
    console.log('permitted');

    // return 'permitted';
  } else {
    // deny the request, show an error
    console.log('denied');

    // return 'denied';
  }

  return !!res;
}

async function startWithABACModel() {
  const enforcer = await newEnforcer('config/abac_rule_model.conf', 'config/abac_rule_policy.csv');

  const sub = {
    Age: 20,
  }; // the user that wants to access a resource.
  // const sub = 'alice';
  const obj = '/data1'; // the resource that is going to be accessed.
  const act = 'read'; // the operation that the user performs on the resource.

  const res = await enforcer.enforce(sub, obj, act);
  if (res) {
    // permit alice to read data1
    // console.log('permitted');

    // return 'permitted';
  } else {
    // deny the request, show an error
    // console.log('denied');

    // return 'denied';
  }

  return Promise.all([
    Promise.resolve(res),
    enforcer.enforce({Age: 30}, obj, act),
  ]);
}

async function startWithMongodbAdapter() {
  const adapter = await mongodbAdapter.create();
  adapter.isFiltered = () => (false);
  const enforcer = await newEnforcer('config/abac_rule_model.conf', adapter);

  const sub = {
    age: 40,
  }; // the user that wants to access a resource.
  // const sub = 'alice';
  const obj = '/data1'; // the resource that is going to be accessed.
  const act = 'read'; // the operation that the user performs on the resource.

  await enforcer.loadPolicy();

  console.log('adapter');
  console.log(adapter);
  console.log('add policy');

  await enforcer.addPolicy(
    'r.sub.age > 18 && r.sub.age <= 50', '/data1', 'read',
  );

  await enforcer.savePolicy();

  // const res = await enforcer.enforce(sub, obj, act);

  return Promise.all([
    enforcer.enforce(sub, obj, act),
    enforcer.enforce({age: 60}, obj, act),
  ]);
}

// startWithBasicModel().then(console.log);
// startWithABACModel().then(console.log);
startWithMongodbAdapter().then(console.log);

setTimeout(() => {

}, 2000);
