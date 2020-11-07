import CommandInt from "@Interfaces/CommandInt";
import { MessageEmbed } from "discord.js";

const translator = (str: string): string => {
  let end = false;
  let i = 1;
  str = str.toLowerCase();
  const mainArray = str.split(" ");
  //split each word into array
  for (let arrPos = 0; arrPos < mainArray.length; arrPos++) {
    const strArray = mainArray[arrPos].split("");
    end = false;
    //strip punctuation
    for (let charPos = 0; charPos < strArray.length; charPos++) {
      if (strArray[charPos].match(/['".,!?]/)) {
        strArray.splice(charPos, 1);
      }
    }
    //word begins with vowel
    if (strArray[0].match(/[aeiou]/)) {
      strArray.push("w");
      strArray.push("a");
      strArray.push("y");
      mainArray[arrPos] = strArray.join("");
      end = true;
      continue;
    }
    // word begins with consonant, contains vowel
    for (i = 1; i < strArray.length; i++) {
      if (strArray[i].match(/[aeiou]/)) {
        const pushString = strArray.splice(0, i).join("");
        strArray.push(pushString);
        strArray.push("a");
        strArray.push("y");
        mainArray[arrPos] = strArray.join("");
        end = true;
        break;
      }
    }
    // word contains no vowel
    if (!end) {
      strArray.push("a");
      strArray.push("y");
      mainArray[arrPos] = strArray.join("");
    }
  }
  //restringify
  return mainArray.join(" ");
};

const pigLatin: CommandInt = {
  names: ["piglatin", "pig"],
  description: "Translates the given string into piglatin.",
  run: async (message) => {
    try {
      const { commandArguments, channel } = message;

      if (!commandArguments.length) {
        await message.reply(
          "Would you please try the command again, and provide the sentence you would like me to translate?"
        );
        return;
      }

      // Call translation algorithm
      const translation = translator(commandArguments.join(" "));

      // Construct embed
      const pigEmbed = new MessageEmbed()
        .setTitle("Igpay Atinlay")
        .setDescription("I have translated your sentence for you!")
        .addFields(
          { name: "Original Sentence", value: commandArguments.join(" ") },
          { name: "Translated Sentence", value: translation }
        );

      await channel.send(pigEmbed);
    } catch (error) {
      console.log(
        `${message.guild?.name} had the following error with the pig latin command:`
      );
      console.log(error);
      message.reply("I am so sorry, but I cannot do that at the moment.");
    }
  },
};

export default pigLatin;