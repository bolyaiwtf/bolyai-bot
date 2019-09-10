const { expect } = require('chai');
const bolyaiwtf = require('../lib/bolyaiwtf');

describe('BolyaiWtf', function () {
  describe('#removeHTML', function () {
    it('should turn images into links', function () {
      const str = `<img src="http://crouton.net/crouton.png" alt="Crouton" />`;
      return expect(bolyaiwtf.removeHTML(str)).to.eql('Crouton [http://crouton.net/crouton.png]');
    });

    it('should convert HTML to plaintext', function () {
      const str = '<strong>Hello</strong> this is a <a href="https://google.com"><em>test</em></a>.';
      return expect(bolyaiwtf.removeHTML(str)).to.eql('Hello this is a test.');
    });
  });

  describe('#reformat', function () {
    it('should split source into header and comment', function () {
      const src = {
        header: 'this is a header',
        comment: 'and this is a comment'
      };

      const output = bolyaiwtf.reformat(src);

      expect(output.header).to.eql('this is a header');
      return expect(output.comment).to.eql('and this is a comment');
    });

    it('should remove HTML and properly handle images', function () {
      const src = {
        header: 'this is a <u>header</u>',
        comment: '<img src="http://crouton.net/crouton.png" alt="Crouton" />'
      };

      const output = bolyaiwtf.reformat(src);

      expect(output.header).to.eql('this is a header');
      return expect(output.comment).to.eql('Crouton [http://crouton.net/crouton.png]');
    });

    it('should return null for comment if there isnt one', function () {
      const src = { header: 'this is a header' };
      const output = bolyaiwtf.reformat(src);

      expect(output.header).to.eql('this is a header');
      return expect(output.comment).to.be.null;
    });
  });

  describe('#init', async function () {
    it('should return all props', async function () {
      const output = bolyaiwtf.init();

      expect(output).to.eventually.have.property('header');
      return expect(output).to.eventually.have.property('comment');
    });
  });
});
