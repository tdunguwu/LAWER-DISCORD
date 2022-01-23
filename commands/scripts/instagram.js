const axios = require('axios');
const { MessageEmbed  } = require('discord.js');
const { stripIndent } = require('common-tags')
module.exports = {
  name: "ins",
  author: "tdunguwu",
  category: "info",
  description: "coi ins ;-;",
  async run(client, message, args) {
 if (!args[0]) {
            return message.channel.send(`Vui lòng nhập tên kênh`)
        }
        let url, response, account, details;
        try {
            url = `https://instagram.com/${args[0]}/?__a=1`;
            response = await axios.get(url);
            details = response.data.graphql.user
        } catch (error) {
            return message.channel.send(`Không phải là một tài khoản`)
        }

        const embed = new MessageEmbed()
            .setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Total Posts:",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Followers:",
                    value: details.edge_followed_by.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Following:",
                    value: details.edge_follow.count.toLocaleString(),
                    inline: true
                }
            )
        await message.channel.send(embed)

    }
}