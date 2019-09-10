const Urban = require('../lib/urban');
const { expect } = require('chai');
const Chance = require('chance');

const chance = new Chance();

describe('Urban', function () {
  describe('#parseText', function () {
    beforeEach(function () {
      this.urban = new Urban({});
    });

    it('should remove square braces', function () {
      const str = 'Hello [this] is a [test] string.';
      return expect(this.urban.parseText(str)).to.eql('Hello this is a test string.');
    });

    it('should properly handle length', function () {
      const str = chance.string({ length: 2000 });
      expect(this.urban.parseText(str)).to.not.eql(str);
      return expect(this.urban.parseText(str)).to.have.length(1024);
    });
  });

  describe('#generateEmbed', function () {
    beforeEach(function () {
      this.urban = new Urban({
        word: 'thing',
        user: {
          username: 'bojai',
          avatarURL: 'bleh'
        }
      });

      this.data = {
        definition: 'This is a thing.',
        author: 'Confucius',
        URL: 'http://crouton.net'
      }
    });

    it('should return props correctly', function () {
      const result = this.urban.generateEmbed(this.data);

      expect(result.embed.author).to.eql({
        name: this.urban.user.username,
        icon_url: this.urban.user.avatarURL
      });
      expect(result.embed.title).to.eql(this.urban.word);
      expect(result.embed.url).to.eql(this.data.URL);
      expect(result.embed).to.have.property('description');
      return expect(result.embed.fields).to.have.length(3);
    });

    it('should not return any example if it is not provided', function () {
      const result = this.urban.generateEmbed(this.data);
      return expect(result.embed.fields[1].value).to.eql('N/A');
    });

    it('should return example if it is provided', function () {
      let data = this.data;
      data.example = 'Hello there, hello.';

      const result = this.urban.generateEmbed(data);
      return expect(result.embed.fields[1].value).to.eql('Hello there, hello.');
    });

    it('should properly return tags', function () {
      let data = this.data;
      data.tags = ['test', 'tags', 'woohoo'];

      const result = this.urban.generateEmbed(data);
      expect(result.embed.fields).to.have.length(4);
      return expect(result.embed.fields[3].value).to.eql('test, tags, woohoo');
    });
  });

  describe('#init', function () {
    beforeEach(function () {
      this.user = {
        username: 'bojai',
        avatarURL: 'aaa'
      }
    });

    it('should fulfill when word exists', function () {
      const urban = new Urban({ word: 'school', user: this.user });
      return expect(urban.init()).to.eventually.be.fulfilled;
    });

    it('should reject if something is not ok', function () {
      const urban = new Urban({ word: '123654qwepoiasdzxc.', user: this.user });
      return expect(urban.init()).to.eventually.be.rejected;
    });
  });
});
