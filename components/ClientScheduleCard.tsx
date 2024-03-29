import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import { firestore } from "../firebase/config";
import { LightButton } from "./LightButton";

export const ClientScheduleCard = ({ propertyID }: { propertyID: number }) => {
  const form: any = React.useRef();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState<any | {}>({});
  const [showForm, setShowFrom] = React.useState<boolean | null>(true);

  const onSubmit = async () => {
    setIsLoading(true);
    const scheduleRef = firestore
      .collection(`properties`)
      .doc(`${propertyID}`)
      .collection(`schedules`);
    try {
      await scheduleRef
        .doc()
        .set({
          clientName: name,
          clientPhoneNumber: phone,
          clientEmail: email,
          scheduledDate: date,
        })
        .then(() =>
          emailjs
            .sendForm(
              "service_srkb0iw",
              "template_5io9f98",
              form.current,
              "1ADtsFmpfR-1ujNp9"
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            )
        );
      setStatus({ code: 200, message: "Success" });
      setShowFrom(!showForm);
    } catch (error) {
      setStatus({ code: 404, message: "Failed" });
    }
    setIsLoading(false);
  };

  let dateArr = new Date().toLocaleDateString().split("/").reverse();

  return (
    <Flex
      w={{ base: "100%", md: "50%", lg: "100%" }}
      py={{ lg: 14, base: 8 }}
      px={{ lg: 8, base: 10 }}
      bg="secondary.100"
      borderRadius="xl"
      direction="column"
    >
      <Heading
        color="white"
        textTransform="capitalize"
        fontFamily="ProductBold"
        fontSize="2xl"
        mb={{ base: 4 }}
      >
        schedule a date to see this property- we can’t wait to meet you!
      </Heading>

      <Box display={!showForm ? "none" : "block"}>
        <form
          ref={form}
          onSubmit={onSubmit}
          id="contact-form"
          style={{ fontFamily: "ProductLight" }}
        >
          {status && (
            <FormLabel
              style={{ color: "#ffffff", textAlign: "center" }}
              htmlFor="name"
            >
              {status.message}
            </FormLabel>
          )}
          <FormControl fontFamily="ProductLight" mb={{ base: 4 }}>
            <FormLabel
              fontFamily="ProductLight"
              style={{ color: "#ffffff" }}
              htmlFor="name"
            >
              Full name
            </FormLabel>
            <Input
              fontFamily="ProductLight"
              id="name"
              type="text"
              style={{ color: "#ffffff" }}
              value={name}
              name="user_name"
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      setName(e.target.value);
                    }
              }
            />
          </FormControl>
          <FormControl mb={{ base: 4 }}>
            <FormLabel style={{ color: "#ffffff" }} htmlFor="email">
              Email address
            </FormLabel>
            <Input
              fontFamily="ProductLight"
              id="email"
              type="email"
              style={{ color: "#ffffff" }}
              value={email}
              name="user_email"
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      setEmail(e.target.value);
                    }
              }
            />
          </FormControl>
          <FormControl mb={{ base: 4 }}>
            <FormLabel style={{ color: "#ffffff" }} htmlFor="phoneNumber">
              Phone Number
            </FormLabel>
            <Input
              fontFamily="ProductLight"
              id="phoneNumber"
              type="number"
              style={{ color: "#ffffff" }}
              value={phone}
              name="contact_number"
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      setPhone(e.target.value);
                    }
              }
            />
          </FormControl>
          <FormControl mb={{ base: 4 }}>
            <FormLabel style={{ color: "#ffffff" }} htmlFor="date">
              Select a date
            </FormLabel>
            <Input
              fontFamily="ProductLight"
              id="date"
              type="date"
              style={{ color: "#ffffff" }}
              value={date}
              min={dateArr.join("-")}
              name="message"
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      setDate(e.target.value);
                    }
              }
            />
          </FormControl>
          <Box w={{ lg: "40%" }} mt={{ base: 4 }} mb={{ base: 4 }}>
            <LightButton
              onClick={isLoading ? () => {} : onSubmit}
              disabled={!(name && email && phone && date)}
            >
              {isLoading ? "Sending..." : "Submit"}
            </LightButton>
          </Box>
        </form>
      </Box>

      <Box display={showForm ? "none" : "block"}>
        <Text
          fontSize={{ base: "xl" }}
          lineHeight="1.5"
          color="white"
          fontFamily="ProductLight"
        >
          🎉 Thanks! We got your message and we will be in touch with more
          details for your visit 🎉
        </Text>
      </Box>
    </Flex>
  );
};
