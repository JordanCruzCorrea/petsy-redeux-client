import React from "react";
import Item from "../../components/items/item";
import Loader from "../../components/loader/loader";
import View from "../../components/view/view";
import { useAuth } from "../../util/hooks/useAuth";
import { useFetchData } from "../../util/hooks/useFetchData";

export default function Items() {
  const data = useFetchData();
  const { items, isLoading, error } = data.state;

  const auth = useAuth().state;
  const { user } = auth;

  const showData = () => {
    return items.map((item) => (
      <Item key={item.id} user={user} item={item} deletion={data.deletion} />
    ));
  };

  return (
    <View class="flex flex-wrap justify-center mx-auto">
      {isLoading && <Loader size="xl" />}
      {items && showData()}
      {error && <h1>refresh</h1>}
    </View>
  );
}
