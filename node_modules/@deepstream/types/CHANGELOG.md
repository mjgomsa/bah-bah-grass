# [2.3.0] - 2022-05-30

Remove externalUrl

# [2.2.0] - 2020-05-27

Adding telemetry options


# [2.1.0] - 2020-04-27

onMessageReceived method at DeepstreamMonitoring interface receives socket user data ({ userId, serverData, clientData }) as second param in callback

# [2.0.2] - 2019-10-10
# [2.0.1] - 2019-10-10

Fixing publish issue due to a greedy import

# [2.0.0] - 2019-10-10

Changing recieved to received

Changing permission callback to be much less verbose
Changing auth callback to return an object instead of a callback to allow multiple endpoints

# [1.0.3] - 2019-08-09

Adding a metaObject for monitoring and logs

# [1.0.2] - 2019-07-31

Removing dependency on ts-essentials. Plugins that depend on this package now also
need to install @deepstream/protobuf as a dev dependency

```
npm install --save-dev @deepstream/protobuf
```

This is required due to the typescript compilation stage, since the types are bundled
into the same package

# [1.0.1] - 2019-07-31

Attempt as moving all dependencies outside of production to minimize install size

# [1.0.0] - 2019-07-30

Initial release of all custom types used by plugins
