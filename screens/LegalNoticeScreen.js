import React from "react";
import { StyleSheet, ImageBackground, View, ScrollView } from "react-native";
import { Button, Text } from "react-native-elements";


export default function LegalNoticecreen(props) 
{

return (
    
<View style={styles.container}>
        
        <ScrollView style={styles.scrollview}>
            
            <Text h3 style={styles.title}>
                Mentions légales
            </Text>
            
            <Text style={styles.paragraph}>
                Les présentes conditions générales régissent l'utilisation et le fonctionnement
                de l'application de moodtracking iOS et Android nommée "Moodzle".
                Les conditions générales sont conçues pour définir les droits et obligations des utilisateurs, 
                ainsi que les droits, devoirs et responsabilités de l'administrateur en tant que Directeur de la publication.
            </Text>
            
            <Text style={styles.paragraph}>
                En utilisant l'application de moodtracking iOS et Android nommée "Moodzle", vous indiquez que vous avez lu et compris
                les conditions d'utilisation en vigueur en date du 11 mars 2021 et que vous acceptez de les respecter en tout temps.
            </Text>
            
            <Text style={styles.beforetitle}>
                Moodzle est un service proposé par la société Moodz SARL, ayant son siège social 37 rue du Paresseux, 75017 Paris, 
                immatriculée sous le numéro 789012345 au RCS de Paris. Le Directeur de la publication de cette application est Monsieur
                Jean-Michel Moodz, agissant en qualité de Dirigeant de Moodz SARL.
            </Text>

            <Text h4 style={styles.paragraph}>
                Propriété intellectuelle
            </Text>

            <Text style={styles.beforetitle}>
                Tout contenu publié et mis à disposition sur la présente application est la propriété de Moodz SARL et de ses créateurs.
                Cela comprend, mais n'est pas limité aux images, textes, logos, documents, fichiers téléchargeables et tout ce qui contribue 
                à la composition de l'application.
            </Text>

            
            <Text h4 style={styles.paragraph}>
                Comptes
            </Text>

            <Text style={styles.beforetitle}>
                Lorsque vous créez un compte utilisateur sur l'application, vous acceptez ce qui suit : 
                vous êtes seul responsable de votre compte et de la sécurité et de la confidentialité de votre compte, 
                y compris les mots de passe.
                Nous nous réservons le droit de suspendre ou de résilier votre compte si vous utilisez l'application illégalement
                ou si vous violez les conditions d'utilisation acceptable.
            </Text>

            <Text h4 style={styles.paragraph}>
                Limitation de responsabilités
            </Text>
            
            <Text style={styles.beforetitle}>
                Moodz SARL ou l'un de ses employés sera tenu responsable de tout problème découlant de l'application. 
                Néanmoins, Moodz SARL et ses employés ne seront pas tenus responsables de tout problème découlant de toute utilisation
                irrégulière de ce site.
            </Text>

            <Text h4 style={styles.paragraph}>
                Idemnité
            </Text>

            <Text style={styles.beforetitle}>
                En tant qu'utilisateur, vous indemnisez par les présentes Moodz SARL de toute responsabilité, de tout coût, 
                de toute cause d'acvtion, de tout dommage ou de toute dépense découlant de votre utilisation de l'application 
                ou de votre violation de l'une des dispositions énoncées dans les présentes conditions générales.
            </Text>

            <Text h4 style={styles.paragraph}>
                Lois applicables
            </Text>

            <Text style={styles.beforetitle}>
                Ce document est soumis aux lois applicables en France et vise à se conformer à ses règles et règlements nécessaires.
                Cela inclut la réglementation à l'échelle de l'UE énoncée dans le RGPD.
            </Text>

            <Text h4 style={styles.paragraph}>
                Divisibilité
            </Text>

            <Text style={styles.beforetitle}>
                Si, à tout moment, l'une des dispositions énoncées dans les présentes conditions générales est jugée incompatible
                ou invalide en vertu des lois applicables, ces dispositions seront considérées comme nulles et seront retirées des
                présentes conditions générales. Toutes les autres dispositions ne seront pas touchées par les lois et le reste des 
                conditions générales sera toujours considéré comme valide.
            </Text>

            <Text h4 style={styles.paragraph}>
                Modifications
            </Text>

            <Text style={styles.beforetitle}>
                Ces conditions générales peuvent être modifiées de temps à autre afin de maintenir le respect de la loi et de refléter
                tout changement à la façon dont nous gérons l'application et la façon dont nous nous attendons à ce que les utilisateurs 
                se comportent sur l'application. Nous recommandons à nos utilisateurs de vérifier ces conditions générales de temps à autre 
                pour s'assurer qu'ils sont informés de toute mise à jour. Au besoin, nous informerons les utilisateurs par courriel des 
                changements apportés à ces conditions.
            </Text>

            <Text h4 style={styles.title}>
                Politique de confidentialité et protection des données 
            </Text>

            <Text style={styles.subtitle}>
                Collecte des renseignements personnels
            </Text>

            <Text style={styles.paragraph}>
                Les données personnelles des utilisateurs peuvent être collectées dans le cadre de l'utilisation de l'application.
                Les données personnelles suivantes peuvent être collectées : nom d'utilisateur, courriel.
                Ces renseignements personnels collectés sont récupérés via des formulaires.
            </Text>

            <Text style={styles.subtitle}>
                Droit d'accès, d'opposition et de retrait
            </Text>

            <Text style={styles.paragraph}>
                Nous nous engageons à offrir un droit d'accès, d'opposition et de retrait des renseignements personnels. 
                Le droit d'opposition s'entend comme étant la possibilité offerte aux utilisateurs de refuser que leurs renseignements
                personnels soient utilisés à certaines fins mentionnées lors de la collecte.
                Le droit de retrait s'entend comme étant la possibilité offerte aux utilisateurs de demander à ce que leurs renseignements
                personnels ne figurent plus, par exemple, dans une liste de diffusion.
            </Text>

            <Text style={styles.paragraph}>
            Pour pouvoir exercer ces droits, vous pouvez contacter : 
            </Text>

            <Text style={styles.paragraph}>

                Moodz SARL
                37 rue du Paresseux
                75017 Paris
            </Text>

            <Text style={styles.paragraph}>
                Contact par appel ou SMS au O6.01.07.02.08
            </Text>

            <Text style={styles.paragraph}>
                Par mail : heyMoodzWhatsUpBuddy@Moozdle.com
            </Text>

        
      </ScrollView>

      <Button
        title="Retour"
        type="solid"
        buttonStyle={{ 
            backgroundColor: "#5B63AE",
            marginBottom: 25,
            borderRadius:15, 
            width:150, 
            height:50
        }}
        onPress={() => {
          
          props.navigation.navigate("BottomNavigator", { screen: "Settings" });
        }}
      />
    </View>
  
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEFFEB",
  },
  btnContainer: {
    flex: 1,
    borderRadius: 50,
    height: 100,
    width: 150,
  },
  title: {
    marginBottom: 20,
  },
  paragraph: {
      marginBottom: 10,
  }, 
  subtitle: {
    marginBottom: 10,
    fontWeight: "500",
    fontSize: 16
}, 
beforetitle:{
    marginBottom: 20,  
}, 
scrollview: {
    marginLeft: 20, 
    marginRight: 20, 
    marginTop: 70, 
    marginBottom: 15,
}
});


