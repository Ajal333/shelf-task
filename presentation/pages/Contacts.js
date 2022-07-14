import React, { useMemo, useState } from "react";
import {
  Pressable,
  SectionList,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ContactsData from "../common/ContactsData";

const Contacts = () => {
  const [search, setSearch] = useState("");

  // Get contacts who are using the app
  const onShelfData = ContactsData?.filter((contact) => contact?.onShelf);

  // Get contacts who are not using the app
  const notOnShelfData = ContactsData?.filter((contact) => !contact?.onShelf);

  const FormattedData = [
    {
      title: "Contacts already on Shelf",
      data: onShelfData
        ?.filter((item) =>
          item?.first_name?.toLowerCase().includes(search?.toLowerCase())
        )
        ?.sort((a, b) => a?.first_name.localeCompare(b?.first_name)),
    },
    {
      title: "Invite to Shelf",
      data: notOnShelfData
        ?.filter((item) =>
          item?.first_name?.toLowerCase().includes(search?.toLowerCase())
        )
        ?.sort((a, b) => a?.first_name.localeCompare(b?.first_name)),
    },
  ];

  const shareInvite = async () => {
    try {
      const result = await Share.share({
        message: `Ajal P has invited you to join Shelf. Get the app from https://shelfpay.in/`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // console.log("Shared!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed.");
      }
    } catch (error) {
      console.log("Error at shareInvite: ", error);
    }
  };

  const ContactItem = (item) => {
    return (
      <View style={styles.contactItem}>
        <View style={styles.contactDetails}>
          <Text style={[styles.contactItemText]}>{item?.first_name}</Text>
          {!item?.onShelf && (
            <Pressable onPress={shareInvite}>
              <Text style={[styles.contactItemText, styles.inviteText]}>
                INVITE
              </Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.smallText}>{item?.phone1}</Text>
      </View>
    );
  };

  // Memorize the data to avoid useless re-render
  const renderItem = useMemo(
    () =>
      ({ item }) =>
        <ContactItem {...{ ...item }} />,
    [FormattedData]
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000123" />
      <Text style={styles.heading}>Contacts</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Search..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        placeholderTextColor="#737373"
        selectionColor="#03c12d"
      />
      <SectionList
        sections={FormattedData}
        keyExtractor={(item, index) => item?.phone1 + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#000123",
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFF",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#737373",
    marginTop: 20,
  },
  contactItem: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#414040",
  },
  contactDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactItemText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  smallText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "500",
  },
  inviteText: {
    color: "#03c12d",
    fontSize: 16,
  },
  inputField: {
    width: "100%",
    height: 50,
    marginVertical: 12,
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    color: "#000",
    backgroundColor: "#fff",
  },
});

export default Contacts;
