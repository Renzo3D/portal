'use strict';

// "posttest": "npm run lint && nsp check",
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../../server/server');

// const {Certification} = app.models;

describe('Models', function () {
  it('should not have an undefined model', () =>
    expect(app.models.doesnt).to.not.exist
  );
  
  it('should have a Certification model', () =>
    expect(app.models.Certification).to.exist
  );
  it('should have a Company model', () =>
    expect(app.models.Company).to.exist
  );

  it('should have a Conversation model', () =>
    expect(app.models.Conversation).to.exist
  );

  it('should have an Employee model', () =>
    expect(app.models.Employee).to.exist
  );

  it('should have a Job model', () =>
    expect(app.models.Job).to.exist
  );

  it('should have a Message model', () =>
    expect(app.models.Message).to.exist
  );

  it('should have a Organization model', () =>
    expect(app.models.Organization).to.exist
  );

  it('should have a Question model', () =>
    expect(app.models.Question).to.exist
  );

  it('should have a School model', () =>
    expect(app.models.School).to.exist
  );

  it('should have a Skill model', () =>
    expect(app.models.Skill).to.exist
  );

  it('should have a Student model', () =>
    expect(app.models.Student).to.exist
  );

  it('should have a Conversation model', () =>
    expect(app.models.Conversation).to.exist
  );

  it('should have an Employee model', () =>
    expect(app.models.Employee).to.exist
  );

  it('should have a Job model', () =>
    expect(app.models.Job).to.exist
  );

  it('should have a Message model', () =>
    expect(app.models.Message).to.exist
  );

  it('should have a Organization model', () =>
    expect(app.models.Organization).to.exist
  );

  it('should have a Question model', () =>
    expect(app.models.Question).to.exist
  );

  it('should have a School model', () =>
    expect(app.models.School).to.exist
  );

  it('should have a Skill model', () =>
    expect(app.models.Skill).to.exist
  );

  it('should have a Student model', () =>
    expect(app.models.Student).to.exist
  );

  /* it('Certification should exist', function() {
    expect(Certification).to.exist;
  }); */

});