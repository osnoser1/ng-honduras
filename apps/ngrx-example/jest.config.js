module.exports = {
  name: 'ngrx-example',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngrx-example',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
