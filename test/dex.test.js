const { expect } = require('chai');
const Dex = require('../lib/dex');
const Chance = require('chance');

const chance = new Chance();

describe('Dex', function () {
  describe('#parse', function () {
    it('should properly parse HTML to Markdown', function () {
      const dex = new Dex({});
      const html = '<strong>test</strong>';
      return expect(dex.parse(html)).to.eql('**test**');
    });
  });

  describe('#truncate', function () {
    beforeEach(function () {
      this.dex = new Dex({});
    });

    it('should truncate strings that are longer than 1024 characters', function () {
      const data = chance.string({ length: 2000 });
      expect(this.dex.truncate(data)).to.not.eql(data);
      return expect(this.dex.truncate(data)).to.have.length(1024);
    });

    it('should return original string if its less than 1024 chars', function () {
      const data = chance.string({ length: 1000 });
      return expect(this.dex.truncate(data)).to.eql(data);
    });
  });

  describe('#fetch', function () {
    it('should fetch', function () {
      const dex = new Dex({ word: 'abstinent' });
      return expect(dex.fetch()).to.eventually.be.fulfilled;
    });

    it('should reject when there is no word', function () {
      const dex = new Dex({});
      return expect(dex.fetch()).to.eventually.be.rejectedWith('NO_WORD_PROVIDED');
    });

    it('should reject when the word does not exist', function () {
      const dex = new Dex({ word: 'kupo' });
      return expect(dex.fetch()).to.eventually.be.rejectedWith('FETCH_ERROR');
    });
  });

  describe('#init', function () {
    it('should fulfill', function () {
      const user = {
        username: 'Bolyai Farkas',
        avatarURL: 'aaa'
      };

      const dex = new Dex({ word: 'abstract', user });
      return expect(dex.init()).to.eventually.be.fulfilled;
    });

    it('should reject', function () {
      const dex = new Dex({ word: 'kupo' });
      return expect(dex.init()).to.eventually.be.rejectedWith('Hiba történt. Lehet, hogy ez a szó nincs meg a DEX-ben.');
    });
  });
});
