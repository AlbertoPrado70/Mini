
const { ImapFlow } = require('imapflow');
const { simpleParser } = require('mailparser');
const matter = require('gray-matter');
const { marked } = require('marked');

require('dotenv').config();

module.exports = async function () {

    let posts = [];

    const client = new ImapFlow({
        host: "alprado.com",
        port: 993,
        secure: true,
        logger: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
        }
    });

    await client.connect();
    await client.mailboxOpen('INBOX');
    
    for await (let message of client.fetch('1:*', { source: true })) {
       
        const parsed = await simpleParser(message.source);
        const markdown = parsed.text;
        const frontMatter = matter(markdown);

        posts.push({
            id: frontMatter.data.id,
            title: frontMatter.data.title,
            published: frontMatter.data.published,
            updated: frontMatter.data.updated,
            category: frontMatter.data.category,
            batery: frontMatter.data.battery,
            content: marked(frontMatter.content)
        });

    }

    await client.logout();

    console.log(posts);

    return posts;

}